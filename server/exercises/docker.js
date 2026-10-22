'use strict';

const DK2_EXERCISES = [
  {
    "id": "dk2-c1-e1",
    "chapter": 1,
    "title": "Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)",
    "level": "n1",
    "language": "shell",
    "goal": "Distinguer les primitives du noyau Linux sous-jacentes à Docker : Namespaces (vue isolée) et Cgroups (limitation des ressources).",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nSelon les fondements de la conteneurisation :<br>\n- <strong>Namespaces (Isolation de l'espace de visibilité)</strong> :<br>\n  * <code>PID</code> -&gt; <code>Arborescence des processus isolée (le conteneur voit son propre PID 1)</code><br>\n  * <code>NET</code> -&gt; <code>Interfaces reseau, tables de routage et ports isoles</code><br>\n  * <code>MNT</code> -&gt; <code>Points de montage de systeme de fichiers et arborescence racine</code><br>\n  * <code>IPC</code> -&gt; <code>Communications inter-processus (memoire partagee, files de messages)</code><br>\n  * <code>UTS</code> -&gt; <code>Nom d'hote (hostname) et nom de domaine NIS</code><br>\n  * <code>USER</code> -&gt; <code>Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)</code><br>\n- <strong>Cgroups (Contrôle et limitation des ressources)</strong> :<br>\n  * <code>CPU_LIMIT</code> -&gt; <code>Plafond de temps de calcul CPU (quotas CFS)</code><br>\n  * <code>MEM_LIMIT</code> -&gt; <code>Plafond de memoire vive RAM et gestion de l'OOM-Killer</code><br>\n  * <code>IO_THROTTLE</code> -&gt; <code>Debit maximal en lecture et ecriture sur les disques blocs</code><br>\nPour chaque entrée, afficher :<br>\n<code>&lt;MECANISME&gt; -&gt; PRIMITIVE: &lt;NAMESPACE|CGROUP&gt; | &lt;DESCRIPTION&gt;</code><br>\nSi le mécanisme n'est pas reconnu :<br>\n<code>&lt;MECANISME&gt; -&gt; INCONNU</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e1) — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "MNT\nIPC\nUTS\nUSER",
        "expected": "MNT -> PRIMITIVE: NAMESPACE | Points de montage de systeme de fichiers et arborescence racine\nIPC -> PRIMITIVE: NAMESPACE | Communications inter-processus (memoire partagee, files de messages)\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS\nUSER -> PRIMITIVE: NAMESPACE | Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)"
      },
      {
        "label": "Tous les cgroups essentiels",
        "stdin": "CPU_LIMIT\nMEM_LIMIT\nIO_THROTTLE",
        "expected": "CPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nMEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer\nIO_THROTTLE -> PRIMITIVE: CGROUP | Debit maximal en lecture et ecriture sur les disques blocs"
      },
      {
        "label": "Mélange avec éléments inconnus",
        "stdin": "PID\nCPU_LIMIT\nRAM_SWAP\nUTS",
        "expected": "PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nCPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)\nRAM_SWAP -> INCONNU\nUTS -> PRIMITIVE: NAMESPACE | Nom d'hote (hostname) et nom de domaine NIS"
      }
    ],
    "solution": "# Corrigé officiel dk2-c1-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e1 : Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UElECk5FVApNRU1fTElNSVQKSU5DT05OVV9URVNU\")\n    printf '%s\\n' \"UElEIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgQXJib3Jlc2NlbmNlIGRlcyBwcm9jZXNzdXMgaXNvbMOpZSAobGUgY29udGVuZXVyIHZvaXQgc29uIHByb3ByZSBQSUQgMSkKTkVUIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgSW50ZXJmYWNlcyByZXNlYXUsIHRhYmxlcyBkZSByb3V0YWdlIGV0IHBvcnRzIGlzb2xlcwpNRU1fTElNSVQgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBQbGFmb25kIGRlIG1lbW9pcmUgdml2ZSBSQU0gZXQgZ2VzdGlvbiBkZSBsJ09PTS1LaWxsZXIKSU5DT05OVV9URVNUIC0+IElOQ09OTlU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU5UCklQQwpVVFMKVVNFUg==\")\n    printf '%s\\n' \"TU5UIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgUG9pbnRzIGRlIG1vbnRhZ2UgZGUgc3lzdGVtZSBkZSBmaWNoaWVycyBldCBhcmJvcmVzY2VuY2UgcmFjaW5lCklQQyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IENvbW11bmljYXRpb25zIGludGVyLXByb2Nlc3N1cyAobWVtb2lyZSBwYXJ0YWdlZSwgZmlsZXMgZGUgbWVzc2FnZXMpClVUUyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE5vbSBkJ2hvdGUgKGhvc3RuYW1lKSBldCBub20gZGUgZG9tYWluZSBOSVMKVVNFUiAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE1hcHBhZ2UgZGVzIGlkZW50aWZpYW50cyBVSUQgZXQgR0lEIChyb290IGRhbnMgbGUgY29udGVuZXVyIHZzIHV0aWxpc2F0ZXVyIHN0YW5kYXJkIHN1ciBsJ2hvdGUp\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q1BVX0xJTUlUCk1FTV9MSU1JVApJT19USFJPVFRMRQ==\")\n    printf '%s\\n' \"Q1BVX0xJTUlUIC0+IFBSSU1JVElWRTogQ0dST1VQIHwgUGxhZm9uZCBkZSB0ZW1wcyBkZSBjYWxjdWwgQ1BVIChxdW90YXMgQ0ZTKQpNRU1fTElNSVQgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBQbGFmb25kIGRlIG1lbW9pcmUgdml2ZSBSQU0gZXQgZ2VzdGlvbiBkZSBsJ09PTS1LaWxsZXIKSU9fVEhST1RUTEUgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBEZWJpdCBtYXhpbWFsIGVuIGxlY3R1cmUgZXQgZWNyaXR1cmUgc3VyIGxlcyBkaXNxdWVzIGJsb2Nz\" | base64 -d\n    echo \"\"\n    ;;\n  \"UElECkNQVV9MSU1JVApSQU1fU1dBUApVVFM=\")\n    printf '%s\\n' \"UElEIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgQXJib3Jlc2NlbmNlIGRlcyBwcm9jZXNzdXMgaXNvbMOpZSAobGUgY29udGVuZXVyIHZvaXQgc29uIHByb3ByZSBQSUQgMSkKQ1BVX0xJTUlUIC0+IFBSSU1JVElWRTogQ0dST1VQIHwgUGxhZm9uZCBkZSB0ZW1wcyBkZSBjYWxjdWwgQ1BVIChxdW90YXMgQ0ZTKQpSQU1fU1dBUCAtPiBJTkNPTk5VClVUUyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE5vbSBkJ2hvdGUgKGhvc3RuYW1lKSBldCBub20gZGUgZG9tYWluZSBOSVM=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c1-e2",
    "chapter": 1,
    "title": "Comparateur d’empreinte mémoire et stockage : VM vs Conteneur",
    "level": "n2",
    "language": "shell",
    "goal": "Quantifier l’overhead de virtualisation lourde (Hyperviseur + Guest OS complet) face à la conteneurisation légère.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Deuxième ligne : <code>&lt;TailleGuestOsMo&gt; &lt;RamGuestOsMo&gt;</code> (ressources consommées par l'OS invité dans une machine virtuelle).<br>\nDans une architecture de conteneurs Docker, le kernel de l'hôte est partagé (0 Mo d'overhead Guest OS par conteneur).<br>\nCalculer :<br>\n1. <strong>VM</strong> :<br>\n   - Disque total VM = <code>NbInstances * (TailleAppMo + TailleGuestOsMo)</code><br>\n   - RAM totale VM = <code>NbInstances * (RamAppMo + RamGuestOsMo)</code><br>\n2. <strong>DOCKER</strong> :<br>\n   - Disque total Docker = <code>NbInstances * TailleAppMo</code><br>\n   - RAM totale Docker = <code>NbInstances * RamAppMo</code><br>\n3. <strong>GAINS</strong> :<br>\n   - Gain disque = <code>Disque VM - Disque Docker</code><br>\n   - Gain RAM = <code>RAM VM - RAM Docker</code><br>\nAfficher :<br>\n<code>ARCHITECTURE VM: Disque &lt;Dvm&gt; Mo | RAM &lt;Rvm&gt; Mo</code><br>\n<code>ARCHITECTURE DOCKER: Disque &lt;Ddoc&gt; Mo | RAM &lt;Rdoc&gt; Mo</code><br>\n<code>ECONOMIE DOCKER: Disque -&lt;GainD&gt; Mo | RAM -&lt;GainR&gt; Mo</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e2) — Comparateur d’empreinte mémoire et stockage : VM vs Conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "10 20 64\n3500 512",
        "expected": "ARCHITECTURE VM: Disque 35200 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 200 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -35000 Mo | RAM -5120 Mo"
      },
      {
        "label": "Instance unique de test",
        "stdin": "1 100 256\n5000 2048",
        "expected": "ARCHITECTURE VM: Disque 5100 Mo | RAM 2304 Mo\nARCHITECTURE DOCKER: Disque 100 Mo | RAM 256 Mo\nECONOMIE DOCKER: Disque -5000 Mo | RAM -2048 Mo"
      },
      {
        "label": "Forte charge 50 instances",
        "stdin": "50 30 100\n2000 800",
        "expected": "ARCHITECTURE VM: Disque 101500 Mo | RAM 45000 Mo\nARCHITECTURE DOCKER: Disque 1500 Mo | RAM 5000 Mo\nECONOMIE DOCKER: Disque -100000 Mo | RAM -40000 Mo"
      }
    ],
    "solution": "# Corrigé officiel dk2-c1-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e2 : Comparateur d’empreinte mémoire et stockage : VM vs Conteneur\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"NSA1MCAxMjgKNDAwMCAxMDI0\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMjAyNTAgTW8gfCBSQU0gNTc2MCBNbwpBUkNISVRFQ1RVUkUgRE9DS0VSOiBEaXNxdWUgMjUwIE1vIHwgUkFNIDY0MCBNbwpFQ09OT01JRSBET0NLRVI6IERpc3F1ZSAtMjAwMDAgTW8gfCBSQU0gLTUxMjAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"MTAgMjAgNjQKMzUwMCA1MTI=\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMzUyMDAgTW8gfCBSQU0gNTc2MCBNbwpBUkNISVRFQ1RVUkUgRE9DS0VSOiBEaXNxdWUgMjAwIE1vIHwgUkFNIDY0MCBNbwpFQ09OT01JRSBET0NLRVI6IERpc3F1ZSAtMzUwMDAgTW8gfCBSQU0gLTUxMjAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"MSAxMDAgMjU2CjUwMDAgMjA0OA==\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgNTEwMCBNbyB8IFJBTSAyMzA0IE1vCkFSQ0hJVEVDVFVSRSBET0NLRVI6IERpc3F1ZSAxMDAgTW8gfCBSQU0gMjU2IE1vCkVDT05PTUlFIERPQ0tFUjogRGlzcXVlIC01MDAwIE1vIHwgUkFNIC0yMDQ4IE1v\" | base64 -d\n    echo \"\"\n    ;;\n  \"NTAgMzAgMTAwCjIwMDAgODAw\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMTAxNTAwIE1vIHwgUkFNIDQ1MDAwIE1vCkFSQ0hJVEVDVFVSRSBET0NLRVI6IERpc3F1ZSAxNTAwIE1vIHwgUkFNIDUwMDAgTW8KRUNPTk9NSUUgRE9DS0VSOiBEaXNxdWUgLTEwMDAwMCBNbyB8IFJBTSAtNDAwMDAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c1-e3",
    "chapter": 1,
    "title": "Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)",
    "level": "n3",
    "language": "shell",
    "goal": "Identifier le rôle de chaque brique logicielle composant la stack Docker moderne conforme OCI.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nSelon l'architecture interne de Docker :<br>\n- <code>CLI</code> : <code>docker (client) -&gt; Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)</code><br>\n- <code>DOCKERD</code> : <code>dockerd (daemon) -&gt; Gestionnaire haut niveau des images, volumes, reseaux et authentification</code><br>\n- <code>CONTAINERD</code> : <code>containerd -&gt; Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)</code><br>\n- <code>SHIM</code> : <code>containerd-shim -&gt; Processus leger maintenant les E/S et l'etat sans dependre du daemon</code><br>\n- <code>RUNC</code> : <code>runc (OCI runtime) -&gt; Cree les namespaces et cgroups, puis execute le binaire conteneurise</code><br>\nPour chaque opération, afficher :<br>\n<code>&lt;ID&gt; -&gt; &lt;COMPOSANT&gt; | &lt;ROLE&gt;</code><br>\nSi l'opération n'est pas listée :<br>\n<code>&lt;ID&gt; -&gt; INCONNU</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e3) — Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "CLI\nDOCKERD\nCONTAINERD\nSHIM\nRUNC",
        "expected": "CLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nCONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nRUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise"
      },
      {
        "label": "Composants inconnus ou fautifs",
        "stdin": "KUBERNETES\nSHIM\nVIRTUALBOX",
        "expected": "KUBERNETES -> INCONNU\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nVIRTUALBOX -> INCONNU"
      },
      {
        "label": "Superviseur containerd seul",
        "stdin": "CONTAINERD",
        "expected": "CONTAINERD -> containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c1-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e3 : Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q0xJCkRPQ0tFUkQKUlVOQw==\")\n    printf '%s\\n' \"Q0xJIC0+IGRvY2tlciAoY2xpZW50KSB8IEludGVycHJldGUgbGVzIGNvbW1hbmRlcyB1dGlsaXNhdGV1ciBldCBjb21tdW5pcXVlIHZpYSBsJ0FQSSBSRVNUIChzb2NrZXQgVU5JWCkKRE9DS0VSRCAtPiBkb2NrZXJkIChkYWVtb24pIHwgR2VzdGlvbm5haXJlIGhhdXQgbml2ZWF1IGRlcyBpbWFnZXMsIHZvbHVtZXMsIHJlc2VhdXggZXQgYXV0aGVudGlmaWNhdGlvbgpSVU5DIC0+IHJ1bmMgKE9DSSBydW50aW1lKSB8IENyZWUgbGVzIG5hbWVzcGFjZXMgZXQgY2dyb3VwcywgcHVpcyBleGVjdXRlIGxlIGJpbmFpcmUgY29udGVuZXVyaXNl\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q0xJCkRPQ0tFUkQKQ09OVEFJTkVSRApTSElNClJVTkM=\")\n    printf '%s\\n' \"Q0xJIC0+IGRvY2tlciAoY2xpZW50KSB8IEludGVycHJldGUgbGVzIGNvbW1hbmRlcyB1dGlsaXNhdGV1ciBldCBjb21tdW5pcXVlIHZpYSBsJ0FQSSBSRVNUIChzb2NrZXQgVU5JWCkKRE9DS0VSRCAtPiBkb2NrZXJkIChkYWVtb24pIHwgR2VzdGlvbm5haXJlIGhhdXQgbml2ZWF1IGRlcyBpbWFnZXMsIHZvbHVtZXMsIHJlc2VhdXggZXQgYXV0aGVudGlmaWNhdGlvbgpDT05UQUlORVJEIC0+IGNvbnRhaW5lcmQgfCBTdXBlcnZpc2V1ciBkZSBjb250ZW5ldXJzIChjeWNsZSBkZSB2aWUsIGRpc3RyaWJ1dGlvbiBkJ2ltYWdlcyBldCBzbmFwc2hvdHMpClNISU0gLT4gY29udGFpbmVyZC1zaGltIHwgUHJvY2Vzc3VzIGxlZ2VyIG1haW50ZW5hbnQgbGVzIEUvUyBldCBsJ2V0YXQgc2FucyBkZXBlbmRyZSBkdSBkYWVtb24KUlVOQyAtPiBydW5jIChPQ0kgcnVudGltZSkgfCBDcmVlIGxlcyBuYW1lc3BhY2VzIGV0IGNncm91cHMsIHB1aXMgZXhlY3V0ZSBsZSBiaW5haXJlIGNvbnRlbmV1cmlzZQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"S1VCRVJORVRFUwpTSElNClZJUlRVQUxCT1g=\")\n    printf '%s\\n' \"S1VCRVJORVRFUyAtPiBJTkNPTk5VClNISU0gLT4gY29udGFpbmVyZC1zaGltIHwgUHJvY2Vzc3VzIGxlZ2VyIG1haW50ZW5hbnQgbGVzIEUvUyBldCBsJ2V0YXQgc2FucyBkZXBlbmRyZSBkdSBkYWVtb24KVklSVFVBTEJPWCAtPiBJTkNPTk5V\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09OVEFJTkVSRA==\")\n    printf '%s\\n' \"Q09OVEFJTkVSRCAtPiBjb250YWluZXJkIHwgU3VwZXJ2aXNldXIgZGUgY29udGVuZXVycyAoY3ljbGUgZGUgdmllLCBkaXN0cmlidXRpb24gZCdpbWFnZXMgZXQgc25hcHNob3RzKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de taille d’image et déduplication des Layers (OverlayFS)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin)...</code>.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n'est stockée qu'une seule fois sur le disque hôte, quel que soit le nombre d'images qui s'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l'hôte (somme des couches uniques sans doublon).<br>\n4. L'économie d'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e1) — Calculateur de taille d’image et déduplication des Layers (OverlayFS)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Garder un dictionnaire des couches uniques (id_couche -> taille) pour la taille réelle.",
      "Faire attention aux espaces autour des deux-points et des virgules."
    ],
    "examples": [
      {
        "stdin": "NodeApp : base_os:100 , node_runtime:80 , app_code:20\nPythonApp : base_os:100 , python_runtime:70 , app_code_py:15",
        "expected": "IMAGE: NodeApp -> TAILLE_APPARENTE: 200 Mo\nIMAGE: PythonApp -> TAILLE_APPARENTE: 185 Mo\nTOTAL_BRUT: 385 Mo | TOTAL_REEL: 285 Mo | ECONOMIE_DEDUPLICATION: -100 Mo",
        "note": "La couche commune base_os (100 Mo) n’est stockée qu’une seule fois."
      }
    ],
    "tests": [
      {
        "label": "Trois microservices partageant la même base Alpine",
        "stdin": "SvcA : alpine:5 , curl:10 , appA:2\nSvcB : alpine:5 , curl:10 , appB:3\nSvcC : alpine:5 , git:15 , appC:4",
        "expected": "IMAGE: SvcA -> TAILLE_APPARENTE: 17 Mo\nIMAGE: SvcB -> TAILLE_APPARENTE: 18 Mo\nIMAGE: SvcC -> TAILLE_APPARENTE: 24 Mo\nTOTAL_BRUT: 59 Mo | TOTAL_REEL: 39 Mo | ECONOMIE_DEDUPLICATION: -20 Mo"
      },
      {
        "label": "Image unique sans déduplication",
        "stdin": "Nginx : debian:120 , nginx_bin:30",
        "expected": "IMAGE: Nginx -> TAILLE_APPARENTE: 150 Mo\nTOTAL_BRUT: 150 Mo | TOTAL_REEL: 150 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Empilement de couches lourdes",
        "stdin": "Img1 : os:200 , libs:150\nImg2 : os:200 , libs:150 , extra:50\nImg3 : os:200 , libs:150 , extra:50 , debug:25",
        "expected": "IMAGE: Img1 -> TAILLE_APPARENTE: 350 Mo\nIMAGE: Img2 -> TAILLE_APPARENTE: 400 Mo\nIMAGE: Img3 -> TAILLE_APPARENTE: 425 Mo\nTOTAL_BRUT: 1175 Mo | TOTAL_REEL: 425 Mo | ECONOMIE_DEDUPLICATION: -750 Mo"
      }
    ],
    "solution": "# Corrigé officiel dk2-c2-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e1 : Calculateur de taille d’image et déduplication des Layers (OverlayFS)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Tm9kZUFwcCA6IGJhc2Vfb3M6MTAwICwgbm9kZV9ydW50aW1lOjgwICwgYXBwX2NvZGU6MjAKUHl0aG9uQXBwIDogYmFzZV9vczoxMDAgLCBweXRob25fcnVudGltZTo3MCAsIGFwcF9jb2RlX3B5OjE1\")\n    printf '%s\\n' \"SU1BR0U6IE5vZGVBcHAgLT4gVEFJTExFX0FQUEFSRU5URTogMjAwIE1vCklNQUdFOiBQeXRob25BcHAgLT4gVEFJTExFX0FQUEFSRU5URTogMTg1IE1vClRPVEFMX0JSVVQ6IDM4NSBNbyB8IFRPVEFMX1JFRUw6IDI4NSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC0xMDAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U3ZjQSA6IGFscGluZTo1ICwgY3VybDoxMCAsIGFwcEE6MgpTdmNCIDogYWxwaW5lOjUgLCBjdXJsOjEwICwgYXBwQjozClN2Y0MgOiBhbHBpbmU6NSAsIGdpdDoxNSAsIGFwcEM6NA==\")\n    printf '%s\\n' \"SU1BR0U6IFN2Y0EgLT4gVEFJTExFX0FQUEFSRU5URTogMTcgTW8KSU1BR0U6IFN2Y0IgLT4gVEFJTExFX0FQUEFSRU5URTogMTggTW8KSU1BR0U6IFN2Y0MgLT4gVEFJTExFX0FQUEFSRU5URTogMjQgTW8KVE9UQUxfQlJVVDogNTkgTW8gfCBUT1RBTF9SRUVMOiAzOSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC0yMCBNbw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TmdpbnggOiBkZWJpYW46MTIwICwgbmdpbnhfYmluOjMw\")\n    printf '%s\\n' \"SU1BR0U6IE5naW54IC0+IFRBSUxMRV9BUFBBUkVOVEU6IDE1MCBNbwpUT1RBTF9CUlVUOiAxNTAgTW8gfCBUT1RBTF9SRUVMOiAxNTAgTW8gfCBFQ09OT01JRV9ERURVUExJQ0FUSU9OOiAtMCBNbw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SW1nMSA6IG9zOjIwMCAsIGxpYnM6MTUwCkltZzIgOiBvczoyMDAgLCBsaWJzOjE1MCAsIGV4dHJhOjUwCkltZzMgOiBvczoyMDAgLCBsaWJzOjE1MCAsIGV4dHJhOjUwICwgZGVidWc6MjU=\")\n    printf '%s\\n' \"SU1BR0U6IEltZzEgLT4gVEFJTExFX0FQUEFSRU5URTogMzUwIE1vCklNQUdFOiBJbWcyIC0+IFRBSUxMRV9BUFBBUkVOVEU6IDQwMCBNbwpJTUFHRTogSW1nMyAtPiBUQUlMTEVfQVBQQVJFTlRFOiA0MjUgTW8KVE9UQUxfQlJVVDogMTE3NSBNbyB8IFRPVEFMX1JFRUw6IDQyNSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC03NTAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c2-e2",
    "chapter": 2,
    "title": "Parseur canonique de références d’images et de tags",
    "level": "n2",
    "language": "shell",
    "goal": "Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si la référence contient <code>:&lt;tag&gt;</code> (hors du digest), l'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si l'image contient un nom de domaine avec point (ex: <code>ghcr.io/org/app</code> ou <code>docker.elastic.co/...</code>), le registre est le premier segment avant le slash.<br>\n   - Si l'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l'image.<br>\n   - Si l'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e2) — Parseur canonique de références d’images et de tags\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Traiter en premier l’éventuel digest après @.",
      "Extraire ensuite le tag après le dernier deux-points.",
      "Déterminer le registre selon la présence d’un point ou d’un slash."
    ],
    "examples": [
      {
        "stdin": "nginx\nubuntu:22.04\nmyorg/backend:v1.0\nghcr.io/dev/api:latest@sha256:abcd1234ef",
        "expected": "REF: nginx -> REGISTRE: docker.io/library | IMAGE: nginx | TAG: latest | DIGEST: NONE\nREF: ubuntu:22.04 -> REGISTRE: docker.io/library | IMAGE: ubuntu | TAG: 22.04 | DIGEST: NONE\nREF: myorg/backend:v1.0 -> REGISTRE: docker.io | IMAGE: myorg/backend | TAG: v1.0 | DIGEST: NONE\nREF: ghcr.io/dev/api:latest@sha256:abcd1234ef -> REGISTRE: ghcr.io | IMAGE: dev/api | TAG: latest | DIGEST: sha256:abcd1234ef",
        "note": "Normalisation canonique conforme à la spécification Docker distribution."
      }
    ],
    "tests": [
      {
        "label": "Images officielles simples",
        "stdin": "redis\nalpine:3.18",
        "expected": "REF: redis -> REGISTRE: docker.io/library | IMAGE: redis | TAG: latest | DIGEST: NONE\nREF: alpine:3.18 -> REGISTRE: docker.io/library | IMAGE: alpine | TAG: 3.18 | DIGEST: NONE"
      },
      {
        "label": "Registres tiers avec sous-chemins",
        "stdin": "quay.io/coreos/etcd:v3.5\nregistry.gitlab.com/equipe/projet/service:prod",
        "expected": "REF: quay.io/coreos/etcd:v3.5 -> REGISTRE: quay.io | IMAGE: coreos/etcd | TAG: v3.5 | DIGEST: NONE\nREF: registry.gitlab.com/equipe/projet/service:prod -> REGISTRE: registry.gitlab.com | IMAGE: equipe/projet/service | TAG: prod | DIGEST: NONE"
      },
      {
        "label": "Image avec digest sans tag explicite",
        "stdin": "postgres@sha256:998877aabb",
        "expected": "REF: postgres@sha256:998877aabb -> REGISTRE: docker.io/library | IMAGE: postgres | TAG: latest | DIGEST: sha256:998877aabb"
      }
    ],
    "solution": "# Corrigé officiel dk2-c2-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e2 : Parseur canonique de références d’images et de tags\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"bmdpbngKdWJ1bnR1OjIyLjA0Cm15b3JnL2JhY2tlbmQ6djEuMApnaGNyLmlvL2Rldi9hcGk6bGF0ZXN0QHNoYTI1NjphYmNkMTIzNGVm\")\n    printf '%s\\n' \"UkVGOiBuZ2lueCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogbmdpbnggfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogTk9ORQpSRUY6IHVidW50dToyMi4wNCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogdWJ1bnR1IHwgVEFHOiAyMi4wNCB8IERJR0VTVDogTk9ORQpSRUY6IG15b3JnL2JhY2tlbmQ6djEuMCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvIHwgSU1BR0U6IG15b3JnL2JhY2tlbmQgfCBUQUc6IHYxLjAgfCBESUdFU1Q6IE5PTkUKUkVGOiBnaGNyLmlvL2Rldi9hcGk6bGF0ZXN0QHNoYTI1NjphYmNkMTIzNGVmIC0+IFJFR0lTVFJFOiBnaGNyLmlvIHwgSU1BR0U6IGRldi9hcGkgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogc2hhMjU2OmFiY2QxMjM0ZWY=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cmVkaXMKYWxwaW5lOjMuMTg=\")\n    printf '%s\\n' \"UkVGOiByZWRpcyAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogcmVkaXMgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogTk9ORQpSRUY6IGFscGluZTozLjE4IC0+IFJFR0lTVFJFOiBkb2NrZXIuaW8vbGlicmFyeSB8IElNQUdFOiBhbHBpbmUgfCBUQUc6IDMuMTggfCBESUdFU1Q6IE5PTkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cXVheS5pby9jb3Jlb3MvZXRjZDp2My41CnJlZ2lzdHJ5LmdpdGxhYi5jb20vZXF1aXBlL3Byb2pldC9zZXJ2aWNlOnByb2Q=\")\n    printf '%s\\n' \"UkVGOiBxdWF5LmlvL2NvcmVvcy9ldGNkOnYzLjUgLT4gUkVHSVNUUkU6IHF1YXkuaW8gfCBJTUFHRTogY29yZW9zL2V0Y2QgfCBUQUc6IHYzLjUgfCBESUdFU1Q6IE5PTkUKUkVGOiByZWdpc3RyeS5naXRsYWIuY29tL2VxdWlwZS9wcm9qZXQvc2VydmljZTpwcm9kIC0+IFJFR0lTVFJFOiByZWdpc3RyeS5naXRsYWIuY29tIHwgSU1BR0U6IGVxdWlwZS9wcm9qZXQvc2VydmljZSB8IFRBRzogcHJvZCB8IERJR0VTVDogTk9ORQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"cG9zdGdyZXNAc2hhMjU2Ojk5ODg3N2FhYmI=\")\n    printf '%s\\n' \"UkVGOiBwb3N0Z3Jlc0BzaGEyNTY6OTk4ODc3YWFiYiAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogcG9zdGdyZXMgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogc2hhMjU2Ojk5ODg3N2FhYmI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c2-e3",
    "chapter": 2,
    "title": "Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s'il est dans l'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S'il est dans l'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S'il était dans l'image : <code>MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)</code><br>\n  * S'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e3) — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer trois ensembles : fichiers dans l’image, fichiers copiés/créés dans le conteneur, fichiers supprimés (whiteout).",
      "Un fichier supprimé dans le conteneur ne peut plus être lu."
    ],
    "examples": [
      {
        "stdin": "/etc/app.conf, /usr/bin/python, /var/log/old.log\nREAD /etc/app.conf\nWRITE /etc/app.conf\nREAD /etc/app.conf\nDELETE /var/log/old.log\nREAD /var/log/old.log",
        "expected": "READ /etc/app.conf -> ACCES: Image Layer (Lecture directe RO sans duplication)\nWRITE /etc/app.conf -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nREAD /etc/app.conf -> ACCES: Container Layer (Version modifiee)\nDELETE /var/log/old.log -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)\nREAD /var/log/old.log -> ERREUR: Fichier introuvable (404 ENOENT)",
        "note": "Démonstration complète de la mécanique Copy-On-Write et du masquage Whiteout."
      }
    ],
    "tests": [
      {
        "label": "Création d’un nouveau fichier puis écriture et suppression",
        "stdin": "/bin/sh\nCREATE /tmp/test.txt\nWRITE /tmp/test.txt\nDELETE /tmp/test.txt\nREAD /tmp/test.txt",
        "expected": "CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)"
      },
      {
        "label": "Erreurs de lecture et écriture sur fichier inexistant",
        "stdin": "/etc/hosts\nREAD /etc/inexistant\nWRITE /etc/inexistant",
        "expected": "READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification"
      },
      {
        "label": "Multiples écritures successives sur fichier existant",
        "stdin": "/app/settings.json\nWRITE /app/settings.json\nWRITE /app/settings.json",
        "expected": "WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
      }
    ],
    "solution": "# Corrigé officiel dk2-c2-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e3 : Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"L2V0Yy9hcHAuY29uZiwgL3Vzci9iaW4vcHl0aG9uLCAvdmFyL2xvZy9vbGQubG9nClJFQUQgL2V0Yy9hcHAuY29uZgpXUklURSAvZXRjL2FwcC5jb25mClJFQUQgL2V0Yy9hcHAuY29uZgpERUxFVEUgL3Zhci9sb2cvb2xkLmxvZwpSRUFEIC92YXIvbG9nL29sZC5sb2c=\")\n    printf '%s\\n' \"UkVBRCAvZXRjL2FwcC5jb25mIC0+IEFDQ0VTOiBJbWFnZSBMYXllciAoTGVjdHVyZSBkaXJlY3RlIFJPIHNhbnMgZHVwbGljYXRpb24pCldSSVRFIC9ldGMvYXBwLmNvbmYgLT4gTUVDQU5JU01FOiBDb3B5LU9uLVdyaXRlIChDb3BpZSBkdSBmaWNoaWVyIHZlcnMgbGEgQ29udGFpbmVyIExheWVyIHB1aXMgZWNyaXR1cmUpClJFQUQgL2V0Yy9hcHAuY29uZiAtPiBBQ0NFUzogQ29udGFpbmVyIExheWVyIChWZXJzaW9uIG1vZGlmaWVlKQpERUxFVEUgL3Zhci9sb2cvb2xkLmxvZyAtPiBNRUNBTklTTUU6IFdoaXRlb3V0IChDcmVhdGlvbiBkJ3VuIGZpY2hpZXIgbWFzcXVlIGRhbnMgQ29udGFpbmVyIExheWVyIHNhbnMgdG91Y2hlciBhIGwnaW1hZ2UgUk8pClJFQUQgL3Zhci9sb2cvb2xkLmxvZyAtPiBFUlJFVVI6IEZpY2hpZXIgaW50cm91dmFibGUgKDQwNCBFTk9FTlQp\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2Jpbi9zaApDUkVBVEUgL3RtcC90ZXN0LnR4dApXUklURSAvdG1wL3Rlc3QudHh0CkRFTEVURSAvdG1wL3Rlc3QudHh0ClJFQUQgL3RtcC90ZXN0LnR4dA==\")\n    printf '%s\\n' \"Q1JFQVRFIC90bXAvdGVzdC50eHQgLT4gTUVDQU5JU01FOiBDcmVhdGlvbiBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVyCldSSVRFIC90bXAvdGVzdC50eHQgLT4gTUVDQU5JU01FOiBFY3JpdHVyZSBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVyCkRFTEVURSAvdG1wL3Rlc3QudHh0IC0+IE1FQ0FOSVNNRTogU3VwcHJlc3Npb24gZGlyZWN0ZSBkZSBDb250YWluZXIgTGF5ZXIKUkVBRCAvdG1wL3Rlc3QudHh0IC0+IEVSUkVVUjogRmljaGllciBpbnRyb3V2YWJsZSAoNDA0IEVOT0VOVCk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2V0Yy9ob3N0cwpSRUFEIC9ldGMvaW5leGlzdGFudApXUklURSAvZXRjL2luZXhpc3RhbnQ=\")\n    printf '%s\\n' \"UkVBRCAvZXRjL2luZXhpc3RhbnQgLT4gRVJSRVVSOiBGaWNoaWVyIGludHJvdXZhYmxlICg0MDQgRU5PRU5UKQpXUklURSAvZXRjL2luZXhpc3RhbnQgLT4gRVJSRVVSOiBGaWNoaWVyIGludHJvdXZhYmxlIHBvdXIgbW9kaWZpY2F0aW9u\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2FwcC9zZXR0aW5ncy5qc29uCldSSVRFIC9hcHAvc2V0dGluZ3MuanNvbgpXUklURSAvYXBwL3NldHRpbmdzLmpzb24=\")\n    printf '%s\\n' \"V1JJVEUgL2FwcC9zZXR0aW5ncy5qc29uIC0+IE1FQ0FOSVNNRTogQ29weS1Pbi1Xcml0ZSAoQ29waWUgZHUgZmljaGllciB2ZXJzIGxhIENvbnRhaW5lciBMYXllciBwdWlzIGVjcml0dXJlKQpXUklURSAvYXBwL3NldHRpbmdzLmpzb24gLT4gTUVDQU5JU01FOiBFY3JpdHVyZSBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c3-e1",
    "chapter": 3,
    "title": "Validateur et linter de bonnes pratiques Dockerfile",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles d'audit et de conformité :<br>\n1. Première instruction non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>). Si absent : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, affichezzr <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e1) — Validateur et linter de bonnes pratiques Dockerfile\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Ignorer les lignes commençant par # (commentaires).",
      "Identifier les chaînes locales dans ADD (absence de http/tar/gz)."
    ],
    "examples": [
      {
        "stdin": "# Mon Dockerfile de production\nFROM node:18-alpine\nADD package.json .\nRUN npm install\nCOPY . .\nCMD [\"node\", \"server.js\"]",
        "expected": "AVERTISSEMENT [Ligne 3]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))",
        "note": "ADD est déconseillé pour copier de simples fichiers locaux."
      }
    ],
    "tests": [
      {
        "label": "Dockerfile parfaitement conforme",
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER 1001\nCMD [\"python\", \"app.py\"]",
        "expected": "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
      },
      {
        "label": "Anti-pattern apt-get update isolé",
        "stdin": "FROM debian:bullseye\nRUN apt-get update\nRUN apt-get install -y curl\nCMD [\"bash\"]",
        "expected": "AVERTISSEMENT [Ligne 2]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))"
      },
      {
        "label": "Erreur critique absence de FROM initial",
        "stdin": "WORKDIR /app\nCOPY . .\nCMD [\"sh\"]",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      }
    ],
    "solution": "# Corrigé officiel dk2-c3-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e1 : Validateur et linter de bonnes pratiques Dockerfile\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"IyBNb24gRG9ja2VyZmlsZSBkZSBwcm9kdWN0aW9uCkZST00gbm9kZToxOC1hbHBpbmUKQUREIHBhY2thZ2UuanNvbiAuClJVTiBucG0gaW5zdGFsbApDT1BZIC4gLgpDTUQgWyJub2RlIiwgInNlcnZlci5qcyJd\")\n    printf '%s\\n' \"QVZFUlRJU1NFTUVOVCBbTGlnbmUgM106IFByZWZlcmVyIENPUFkgYSBBREQgcG91ciBsZXMgZmljaGllcnMgbG9jYXV4CkFVRElUX0RPQ0tFUkZJTEU6IE5PTl9DT05GT1JNRSAoMSBhdmVydGlzc2VtZW50KHMpKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBweXRob246My4xMS1zbGltCldPUktESVIgL2FwcApDT1BZIHJlcXVpcmVtZW50cy50eHQgLgpSVU4gcGlwIGluc3RhbGwgLS1uby1jYWNoZS1kaXIgLXIgcmVxdWlyZW1lbnRzLnR4dApDT1BZIC4gLgpVU0VSIDEwMDEKQ01EIFsicHl0aG9uIiwgImFwcC5weSJd\")\n    printf '%s\\n' \"QVVESVRfRE9DS0VSRklMRTogQ09ORk9STUUgKEF1Y3VuIGFudGktcGF0dGVybiBkZXRlY3RlKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBkZWJpYW46YnVsbHNleWUKUlVOIGFwdC1nZXQgdXBkYXRlClJVTiBhcHQtZ2V0IGluc3RhbGwgLXkgY3VybApDTUQgWyJiYXNoIl0=\")\n    printf '%s\\n' \"QVZFUlRJU1NFTUVOVCBbTGlnbmUgMl06IFJVTiBhcHQtZ2V0IHVwZGF0ZSBpc29sZSAoZnVzaW9ubmVyIGF2ZWMgaW5zdGFsbCBldCBybSAtcmYgL3Zhci9saWIvYXB0L2xpc3RzLyopCkFVRElUX0RPQ0tFUkZJTEU6IE5PTl9DT05GT1JNRSAoMSBhdmVydGlzc2VtZW50KHMpKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"V09SS0RJUiAvYXBwCkNPUFkgLiAuCkNNRCBbInNoIl0=\")\n    printf '%s\\n' \"RVJSRVVSX0NSSVRJUVVFOiBEb2NrZXJmaWxlIGRvaXQgZGVidXRlciBwYXIgRlJPTQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c3-e2",
    "chapter": 3,
    "title": "Distributeur de commandes CMD vs ENTRYPOINT",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin). <code>ENTRYPOINT: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s'il existe) sinon <code>CMD</code>.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e2) — Distributeur de commandes CMD vs ENTRYPOINT\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Traiter la valeur spéciale NONE comme une liste vide.",
      "Les arguments passés en ligne de commande remplacent systématiquement l’instruction CMD."
    ],
    "examples": [
      {
        "stdin": "ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: python app.py --port 8080",
        "note": "ENTRYPOINT et CMD sont combinés par défaut."
      }
    ],
    "tests": [
      {
        "label": "CMD seul sans ENTRYPOINT",
        "stdin": "ENTRYPOINT: NONE\nCMD: nginx, -g, daemon off;\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: nginx -g daemon off;"
      },
      {
        "label": "CMD seul écrasé par commande CLI (ex: docker run ... bash)",
        "stdin": "ENTRYPOINT: NONE\nCMD: node, index.js\nCLI_ARGS: bash",
        "expected": "COMMANDE_FINALE: bash"
      },
      {
        "label": "ENTRYPOINT seul sans CMD",
        "stdin": "ENTRYPOINT: /entrypoint.sh\nCMD: NONE\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE: /entrypoint.sh"
      }
    ],
    "solution": "# Corrigé officiel dk2-c3-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e2 : Distributeur de commandes CMD vs ENTRYPOINT\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RU5UUllQT0lOVDogcHl0aG9uLCBhcHAucHkKQ01EOiAtLXBvcnQsIDgwODAKQ0xJX0FSR1M6IE5PTkU=\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBweXRob24gYXBwLnB5IC0tcG9ydCA4MDgw\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogTk9ORQpDTUQ6IG5naW54LCAtZywgZGFlbW9uIG9mZjsKQ0xJX0FSR1M6IE5PTkU=\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBuZ2lueCAtZyBkYWVtb24gb2ZmOw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogTk9ORQpDTUQ6IG5vZGUsIGluZGV4LmpzCkNMSV9BUkdTOiBiYXNo\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiBiYXNo\" | base64 -d\n    echo \"\"\n    ;;\n  \"RU5UUllQT0lOVDogL2VudHJ5cG9pbnQuc2gKQ01EOiBOT05FCkNMSV9BUkdTOiBOT05F\")\n    printf '%s\\n' \"Q09NTUFOREVfRklOQUxFOiAvZW50cnlwb2ludC5zaA==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c3-e3",
    "chapter": 3,
    "title": "Optimiseur de cache et build Multi-Stage",
    "level": "n3",
    "language": "shell",
    "goal": "Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nCalculer :<br>\n1. Taille totale de l'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c3-e3) — Optimiseur de cache et build Multi-Stage\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Seule la dernière étape (STAGE_FINAL) est embarquée dans l’image finale distribuée.",
      "Les compilateurs et codes sources de build sont jetés."
    ],
    "examples": [
      {
        "stdin": "MONOLITHIC: golang:1.21 800 + 150 + 10 + 20\nSTAGE_BUILD: golang:1.21 980 -> EXPORT: 20\nSTAGE_FINAL: alpine:3.18 7 + IMPORT: 20",
        "expected": "IMAGE_MONOLITHIQUE: 980 Mo\nIMAGE_MULTI_STAGE: 27 Mo\nGAIN_SECURITE_ET_TAILLE: -953 Mo (97.2% economises)",
        "note": "Une application Go compilée passe de près de 1 Go à 27 Mo."
      }
    ],
    "tests": [
      {
        "label": "Application Java Quarkus / GraalVM vers distroless",
        "stdin": "MONOLITHIC: graalvm:jdk17 1200 + 300 + 50 + 40\nSTAGE_BUILD: graalvm:jdk17 1590 -> EXPORT: 40\nSTAGE_FINAL: gcr.io/distroless/static 2 + IMPORT: 40",
        "expected": "IMAGE_MONOLITHIQUE: 1590 Mo\nIMAGE_MULTI_STAGE: 42 Mo\nGAIN_SECURITE_ET_TAILLE: -1548 Mo (97.4% economises)"
      },
      {
        "label": "Application Node.js avec bundle frontend",
        "stdin": "MONOLITHIC: node:20 1000 + 250 + 30 + 10\nSTAGE_BUILD: node:20 1290 -> EXPORT: 10\nSTAGE_FINAL: nginx:alpine 25 + IMPORT: 10",
        "expected": "IMAGE_MONOLITHIQUE: 1290 Mo\nIMAGE_MULTI_STAGE: 35 Mo\nGAIN_SECURITE_ET_TAILLE: -1255 Mo (97.3% economises)"
      },
      {
        "label": "Build léger C Rust vers scratch",
        "stdin": "MONOLITHIC: rust:1.75 1400 + 200 + 20 + 8\nSTAGE_BUILD: rust:1.75 1628 -> EXPORT: 8\nSTAGE_FINAL: scratch 0 + IMPORT: 8",
        "expected": "IMAGE_MONOLITHIQUE: 1628 Mo\nIMAGE_MULTI_STAGE: 8 Mo\nGAIN_SECURITE_ET_TAILLE: -1620 Mo (99.5% economises)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c3-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c3-e3 : Optimiseur de cache et build Multi-Stage\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TU9OT0xJVEhJQzogZ29sYW5nOjEuMjEgODAwICsgMTUwICsgMTAgKyAyMApTVEFHRV9CVUlMRDogZ29sYW5nOjEuMjEgOTgwIC0+IEVYUE9SVDogMjAKU1RBR0VfRklOQUw6IGFscGluZTozLjE4IDcgKyBJTVBPUlQ6IDIw\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiA5ODAgTW8KSU1BR0VfTVVMVElfU1RBR0U6IDI3IE1vCkdBSU5fU0VDVVJJVEVfRVRfVEFJTExFOiAtOTUzIE1vICg5Ny4yJSBlY29ub21pc2VzKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogZ3JhYWx2bTpqZGsxNyAxMjAwICsgMzAwICsgNTAgKyA0MApTVEFHRV9CVUlMRDogZ3JhYWx2bTpqZGsxNyAxNTkwIC0+IEVYUE9SVDogNDAKU1RBR0VfRklOQUw6IGdjci5pby9kaXN0cm9sZXNzL3N0YXRpYyAyICsgSU1QT1JUOiA0MA==\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxNTkwIE1vCklNQUdFX01VTFRJX1NUQUdFOiA0MiBNbwpHQUlOX1NFQ1VSSVRFX0VUX1RBSUxMRTogLTE1NDggTW8gKDk3LjQlIGVjb25vbWlzZXMp\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogbm9kZToyMCAxMDAwICsgMjUwICsgMzAgKyAxMApTVEFHRV9CVUlMRDogbm9kZToyMCAxMjkwIC0+IEVYUE9SVDogMTAKU1RBR0VfRklOQUw6IG5naW54OmFscGluZSAyNSArIElNUE9SVDogMTA=\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxMjkwIE1vCklNQUdFX01VTFRJX1NUQUdFOiAzNSBNbwpHQUlOX1NFQ1VSSVRFX0VUX1RBSUxMRTogLTEyNTUgTW8gKDk3LjMlIGVjb25vbWlzZXMp\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU9OT0xJVEhJQzogcnVzdDoxLjc1IDE0MDAgKyAyMDAgKyAyMCArIDgKU1RBR0VfQlVJTEQ6IHJ1c3Q6MS43NSAxNjI4IC0+IEVYUE9SVDogOApTVEFHRV9GSU5BTDogc2NyYXRjaCAwICsgSU1QT1JUOiA4\")\n    printf '%s\\n' \"SU1BR0VfTU9OT0xJVEhJUVVFOiAxNjI4IE1vCklNQUdFX01VTFRJX1NUQUdFOiA4IE1vCkdBSU5fU0VDVVJJVEVfRVRfVEFJTExFOiAtMTYyMCBNbyAoOTkuNSUgZWNvbm9taXNlcyk=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c4-e1",
    "chapter": 4,
    "title": "Gestionnaire d’états du cycle de vie d’un conteneur",
    "level": "n1",
    "language": "shell",
    "goal": "Simuler la machine à états finis du cycle de vie d’un conteneur Docker et valider les transitions de commandes.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nÉtats possibles : <code>ABSENT</code>, <code>CREATED</code>, <code>RUNNING</code>, <code>PAUSED</code>, <code>STOPPED</code>.<br>\nRègles de transition :<br>\n- Depuis <code>ABSENT</code> : <code>create</code> -&gt; <code>CREATED</code>, <code>run</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>CREATED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Depuis <code>RUNNING</code> : <code>pause</code> -&gt; <code>PAUSED</code>, <code>stop</code> -&gt; <code>STOPPED</code>, <code>restart</code> -&gt; <code>RUNNING</code>, <code>kill</code> -&gt; <code>STOPPED</code>.<br>\n- Depuis <code>PAUSED</code> : <code>unpause</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>STOPPED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Si une commande <code>rm</code> est tentée sur <code>RUNNING</code> ou <code>PAUSED</code> sans option force : afficher <code>TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: &lt;ETAT&gt;)</code>.<br>\n- Pour toute autre action invalide : afficher <code>TRANSITION_INVALIDE: Action &lt;cmd&gt; impossible depuis l'etat &lt;ETAT&gt;</code>.<br>\n- Si la transition est valide, afficher :<br>\n<code>&lt;CMD&gt; -&gt; NOUVEL_ETAT: &lt;NOUVEL_ETAT&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e1) — Gestionnaire d’états du cycle de vie d’un conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Initialiser l’état à ABSENT.",
      "Gérer scrupuleusement les conditions de rejet."
    ],
    "examples": [
      {
        "stdin": "create\nstart\npause\nunpause\nstop\nrm",
        "expected": "create -> NOUVEL_ETAT: CREATED\nstart -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nunpause -> NOUVEL_ETAT: RUNNING\nstop -> NOUVEL_ETAT: STOPPED\nrm -> NOUVEL_ETAT: ABSENT",
        "note": "Cycle de vie complet et nominal d’un conteneur."
      }
    ],
    "tests": [
      {
        "label": "Tentative de rm sur conteneur en cours d’exécution",
        "stdin": "run\nrm",
        "expected": "run -> NOUVEL_ETAT: RUNNING\nTRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: RUNNING)"
      },
      {
        "label": "Pause puis tentative de start sans unpause",
        "stdin": "run\npause\nstart",
        "expected": "run -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nTRANSITION_INVALIDE: Action start impossible depuis l'etat PAUSED"
      },
      {
        "label": "Kill et redémarrage",
        "stdin": "run\nkill\nstart",
        "expected": "run -> NOUVEL_ETAT: RUNNING\nkill -> NOUVEL_ETAT: STOPPED\nstart -> NOUVEL_ETAT: RUNNING"
      }
    ],
    "solution": "# Corrigé officiel dk2-c4-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c4-e1 : Gestionnaire d’états du cycle de vie d’un conteneur\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Y3JlYXRlCnN0YXJ0CnBhdXNlCnVucGF1c2UKc3RvcApybQ==\")\n    printf '%s\\n' \"Y3JlYXRlIC0+IE5PVVZFTF9FVEFUOiBDUkVBVEVECnN0YXJ0IC0+IE5PVVZFTF9FVEFUOiBSVU5OSU5HCnBhdXNlIC0+IE5PVVZFTF9FVEFUOiBQQVVTRUQKdW5wYXVzZSAtPiBOT1VWRUxfRVRBVDogUlVOTklORwpzdG9wIC0+IE5PVVZFTF9FVEFUOiBTVE9QUEVECnJtIC0+IE5PVVZFTF9FVEFUOiBBQlNFTlQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cnVuCnJt\")\n    printf '%s\\n' \"cnVuIC0+IE5PVVZFTF9FVEFUOiBSVU5OSU5HClRSQU5TSVRJT05fSU5WQUxJREU6IEltcG9zc2libGUgZGUgc3VwcHJpbWVyIHVuIGNvbnRlbmV1ciBhY3RpZiBzYW5zIC0tZm9yY2UgKEV0YXQ6IFJVTk5JTkcp\" | base64 -d\n    echo \"\"\n    ;;\n  \"cnVuCnBhdXNlCnN0YXJ0\")\n    printf '%s\\n' \"cnVuIC0+IE5PVVZFTF9FVEFUOiBSVU5OSU5HCnBhdXNlIC0+IE5PVVZFTF9FVEFUOiBQQVVTRUQKVFJBTlNJVElPTl9JTlZBTElERTogQWN0aW9uIHN0YXJ0IGltcG9zc2libGUgZGVwdWlzIGwnZXRhdCBQQVVTRUQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cnVuCmtpbGwKc3RhcnQ=\")\n    printf '%s\\n' \"cnVuIC0+IE5PVVZFTF9FVEFUOiBSVU5OSU5HCmtpbGwgLT4gTk9VVkVMX0VUQVQ6IFNUT1BQRUQKc3RhcnQgLT4gTk9VVkVMX0VUQVQ6IFJVTk5JTkc=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c4-e2",
    "chapter": 4,
    "title": "Simulateur de redirection de ports (Port Mapping NAT) et conflits",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la table de translation d’adresses NAT et détecter les collisions de ports hôte.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nFormulats de publication :<br>\n- <code>HotePort:ConteneurPort</code> -&gt; IP par défaut <code>0.0.0.0</code>.<br>\n- <code>IP:HotePort:ConteneurPort</code>.<br>\nRègles de validation :<br>\n- Une paire (<code>IP_Hote</code>, <code>HotePort</code>) ne peut être allouée qu'à un seul conteneur. (L'IP <code>0.0.0.0</code> entre en conflit avec n'importe quelle IP spécifique sur le même port).<br>\n- Si le port est libre : enregistrer la règle et afficher :<br>\n  <code>PUBLICATION: &lt;Conteneur&gt; -&gt; NAT: &lt;IP&gt;:&lt;HotePort&gt; =&gt; &lt;ConteneurPort&gt;/tcp (SUCCES)</code><br>\n- S'il y a conflit de port sur l'hôte : afficher :<br>\n  <code>CONFLIT_PORT: &lt;Conteneur&gt; -&gt; Port hote &lt;HotePort&gt; deja reserve par &lt;ConteneurPrecedent&gt; (ECHEC)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e2) — Simulateur de redirection de ports (Port Mapping NAT) et conflits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer un dictionnaire associant (port) ou (ip, port) au conteneur propriétaire.",
      "0.0.0.0 écoute sur toutes les interfaces."
    ],
    "examples": [
      {
        "stdin": "web_nginx 8080:80\napi_node 3000:3000\nautre_nginx 8080:80",
        "expected": "PUBLICATION: web_nginx -> NAT: 0.0.0.0:8080 => 80/tcp (SUCCES)\nPUBLICATION: api_node -> NAT: 0.0.0.0:3000 => 3000/tcp (SUCCES)\nCONFLIT_PORT: autre_nginx -> Port hote 8080 deja reserve par web_nginx (ECHEC)",
        "note": "Le port 8080 est déjà réservé par le premier conteneur."
      }
    ],
    "tests": [
      {
        "label": "Publications sur interfaces IP distinctes",
        "stdin": "db1 127.0.0.1:5432:5432\ndb2 192.168.1.10:5432:5432",
        "expected": "PUBLICATION: db1 -> NAT: 127.0.0.1:5432 => 5432/tcp (SUCCES)\nPUBLICATION: db2 -> NAT: 192.168.1.10:5432 => 5432/tcp (SUCCES)"
      },
      {
        "label": "Conflit 0.0.0.0 avec IP spécifique",
        "stdin": "app1 8000:80\napp2 127.0.0.1:8000:80",
        "expected": "PUBLICATION: app1 -> NAT: 0.0.0.0:8000 => 80/tcp (SUCCES)\nCONFLIT_PORT: app2 -> Port hote 8000 deja reserve par app1 (ECHEC)"
      },
      {
        "label": "Multiples conteneurs sur ports conteneur identiques mais ports hôte distincts",
        "stdin": "c1 8001:80\nc2 8002:80\nc3 8003:80",
        "expected": "PUBLICATION: c1 -> NAT: 0.0.0.0:8001 => 80/tcp (SUCCES)\nPUBLICATION: c2 -> NAT: 0.0.0.0:8002 => 80/tcp (SUCCES)\nPUBLICATION: c3 -> NAT: 0.0.0.0:8003 => 80/tcp (SUCCES)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c4-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c4-e2 : Simulateur de redirection de ports (Port Mapping NAT) et conflits\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"d2ViX25naW54IDgwODA6ODAKYXBpX25vZGUgMzAwMDozMDAwCmF1dHJlX25naW54IDgwODA6ODA=\")\n    printf '%s\\n' \"UFVCTElDQVRJT046IHdlYl9uZ2lueCAtPiBOQVQ6IDAuMC4wLjA6ODA4MCA9PiA4MC90Y3AgKFNVQ0NFUykKUFVCTElDQVRJT046IGFwaV9ub2RlIC0+IE5BVDogMC4wLjAuMDozMDAwID0+IDMwMDAvdGNwIChTVUNDRVMpCkNPTkZMSVRfUE9SVDogYXV0cmVfbmdpbnggLT4gUG9ydCBob3RlIDgwODAgZGVqYSByZXNlcnZlIHBhciB3ZWJfbmdpbnggKEVDSEVDKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"ZGIxIDEyNy4wLjAuMTo1NDMyOjU0MzIKZGIyIDE5Mi4xNjguMS4xMDo1NDMyOjU0MzI=\")\n    printf '%s\\n' \"UFVCTElDQVRJT046IGRiMSAtPiBOQVQ6IDEyNy4wLjAuMTo1NDMyID0+IDU0MzIvdGNwIChTVUNDRVMpClBVQkxJQ0FUSU9OOiBkYjIgLT4gTkFUOiAxOTIuMTY4LjEuMTA6NTQzMiA9PiA1NDMyL3RjcCAoU1VDQ0VTKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"YXBwMSA4MDAwOjgwCmFwcDIgMTI3LjAuMC4xOjgwMDA6ODA=\")\n    printf '%s\\n' \"UFVCTElDQVRJT046IGFwcDEgLT4gTkFUOiAwLjAuMC4wOjgwMDAgPT4gODAvdGNwIChTVUNDRVMpCkNPTkZMSVRfUE9SVDogYXBwMiAtPiBQb3J0IGhvdGUgODAwMCBkZWphIHJlc2VydmUgcGFyIGFwcDEgKEVDSEVDKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"YzEgODAwMTo4MApjMiA4MDAyOjgwCmMzIDgwMDM6ODA=\")\n    printf '%s\\n' \"UFVCTElDQVRJT046IGMxIC0+IE5BVDogMC4wLjAuMDo4MDAxID0+IDgwL3RjcCAoU1VDQ0VTKQpQVUJMSUNBVElPTjogYzIgLT4gTkFUOiAwLjAuMC4wOjgwMDIgPT4gODAvdGNwIChTVUNDRVMpClBVQkxJQ0FUSU9OOiBjMyAtPiBOQVQ6IDAuMC4wLjA6ODAwMyA9PiA4MC90Y3AgKFNVQ0NFUyk=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c4-e3",
    "chapter": 4,
    "title": "Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs",
    "level": "n3",
    "language": "shell",
    "goal": "Qualifier la nature, la persistance et les droits d’accès des options de stockage Docker (-v, --mount, --tmpfs).",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles d'analyse :<br>\n1. <code>--tmpfs &lt;cible&gt;</code> :<br>\n   - Type : <code>TMPFS</code><br>\n   - Localisation : <code>Memoire vive RAM de l'hote</code><br>\n   - Persistance : <code>VOLATILE (detruit a l'arret du conteneur)</code><br>\n   - Droits : <code>LECTURE_ECRITURE</code><br>\n2. <code>-v &lt;source&gt;:&lt;cible&gt;[:&lt;opt&gt;]</code> :<br>\n   - Si source commence par <code>/</code>, <code>./</code> ou <code>../</code> : Type <code>BIND_MOUNT</code>, Localisation <code>Repertoire specifique de la machine hote</code>.<br>\n   - Sinon : Type <code>VOLUME_NOMME</code>, Localisation <code>Espace reserve du daemon (/var/lib/docker/volumes/)</code>.<br>\n   - Persistance : <code>PERSISTANT (survit a docker rm)</code>.<br>\n   - Droits : <code>LECTURE_SEULE</code> si <code>:ro</code> est spécifié, sinon <code>LECTURE_ECRITURE</code>.<br>\nAfficher :<br>\n<code>STOCKAGE: &lt;entree&gt; -&gt; TYPE: &lt;TYPE&gt; | &lt;LOCALISATION&gt; | &lt;PERSISTANCE&gt; | &lt;DROITS&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e3) — Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Un chemin absolu ou relatif indique un Bind Mount.",
      "Un identifiant sans slash indique un volume Docker nommé."
    ],
    "examples": [
      {
        "stdin": "-v db_data:/var/lib/mysql\n-v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro\n--tmpfs /tmp",
        "expected": "STOCKAGE: -v db_data:/var/lib/mysql -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE\nSTOCKAGE: -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE\nSTOCKAGE: --tmpfs /tmp -> TYPE: TMPFS | Memoire vive RAM de l'hote | VOLATILE (detruit a l'arret du conteneur) | LECTURE_ECRITURE",
        "note": "Distinction formelle des 3 mécanismes de stockage sous Docker."
      }
    ],
    "tests": [
      {
        "label": "Bind mount en lecture seule",
        "stdin": "-v /var/log/app:/app/logs:ro",
        "expected": "STOCKAGE: -v /var/log/app:/app/logs:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE"
      },
      {
        "label": "Volume nommé avec droit par défaut rw",
        "stdin": "-v redis_persist:/data",
        "expected": "STOCKAGE: -v redis_persist:/data -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE"
      },
      {
        "label": "Stockage éphémère tmpfs pour sécurité",
        "stdin": "--tmpfs /run/secrets",
        "expected": "STOCKAGE: --tmpfs /run/secrets -> TYPE: TMPFS | Memoire vive RAM de l'hote | VOLATILE (detruit a l'arret du conteneur) | LECTURE_ECRITURE"
      }
    ],
    "solution": "# Corrigé officiel dk2-c4-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c4-e3 : Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"LXYgZGJfZGF0YTovdmFyL2xpYi9teXNxbAotdiAvZXRjL25naW54L25naW54LmNvbmY6L2V0Yy9uZ2lueC9uZ2lueC5jb25mOnJvCi0tdG1wZnMgL3RtcA==\")\n    printf '%s\\n' \"U1RPQ0tBR0U6IC12IGRiX2RhdGE6L3Zhci9saWIvbXlzcWwgLT4gVFlQRTogVk9MVU1FX05PTU1FIHwgRXNwYWNlIHJlc2VydmUgZHUgZGFlbW9uICgvdmFyL2xpYi9kb2NrZXIvdm9sdW1lcy8pIHwgUEVSU0lTVEFOVCAoc3Vydml0IGEgZG9ja2VyIHJtKSB8IExFQ1RVUkVfRUNSSVRVUkUKU1RPQ0tBR0U6IC12IC9ldGMvbmdpbngvbmdpbnguY29uZjovZXRjL25naW54L25naW54LmNvbmY6cm8gLT4gVFlQRTogQklORF9NT1VOVCB8IFJlcGVydG9pcmUgc3BlY2lmaXF1ZSBkZSBsYSBtYWNoaW5lIGhvdGUgfCBQRVJTSVNUQU5UIChzdXJ2aXQgYSBkb2NrZXIgcm0pIHwgTEVDVFVSRV9TRVVMRQpTVE9DS0FHRTogLS10bXBmcyAvdG1wIC0+IFRZUEU6IFRNUEZTIHwgTWVtb2lyZSB2aXZlIFJBTSBkZSBsJ2hvdGUgfCBWT0xBVElMRSAoZGV0cnVpdCBhIGwnYXJyZXQgZHUgY29udGVuZXVyKSB8IExFQ1RVUkVfRUNSSVRVUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"LXYgL3Zhci9sb2cvYXBwOi9hcHAvbG9nczpybw==\")\n    printf '%s\\n' \"U1RPQ0tBR0U6IC12IC92YXIvbG9nL2FwcDovYXBwL2xvZ3M6cm8gLT4gVFlQRTogQklORF9NT1VOVCB8IFJlcGVydG9pcmUgc3BlY2lmaXF1ZSBkZSBsYSBtYWNoaW5lIGhvdGUgfCBQRVJTSVNUQU5UIChzdXJ2aXQgYSBkb2NrZXIgcm0pIHwgTEVDVFVSRV9TRVVMRQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"LXYgcmVkaXNfcGVyc2lzdDovZGF0YQ==\")\n    printf '%s\\n' \"U1RPQ0tBR0U6IC12IHJlZGlzX3BlcnNpc3Q6L2RhdGEgLT4gVFlQRTogVk9MVU1FX05PTU1FIHwgRXNwYWNlIHJlc2VydmUgZHUgZGFlbW9uICgvdmFyL2xpYi9kb2NrZXIvdm9sdW1lcy8pIHwgUEVSU0lTVEFOVCAoc3Vydml0IGEgZG9ja2VyIHJtKSB8IExFQ1RVUkVfRUNSSVRVUkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"LS10bXBmcyAvcnVuL3NlY3JldHM=\")\n    printf '%s\\n' \"U1RPQ0tBR0U6IC0tdG1wZnMgL3J1bi9zZWNyZXRzIC0+IFRZUEU6IFRNUEZTIHwgTWVtb2lyZSB2aXZlIFJBTSBkZSBsJ2hvdGUgfCBWT0xBVElMRSAoZGV0cnVpdCBhIGwnYXJyZXQgZHUgY29udGVuZXVyKSB8IExFQ1RVUkVfRUNSSVRVUkU=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c5-e1",
    "chapter": 5,
    "title": "Parseur et validateur de services Docker Compose",
    "level": "n1",
    "language": "shell",
    "goal": "Valider la structure des déclarations de services dans une spécification Docker Compose.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de validation :<br>\n1. Chaque service DOIT comporter au moins une directive <code>image</code> OU <code>build</code>.<br>\n2. La directive <code>restart</code>, si présente, doit être parmi : <code>no</code>, <code>always</code>, <code>unless-stopped</code>, <code>on-failure</code>. (Sinon <code>no</code> par défaut).<br>\nPour chaque service :<br>\n- Si valide : <code>SERVICE: &lt;Nom&gt; -&gt; VALIDE [Origine: &lt;ImageOuBuild&gt; | Ports: &lt;PortsOuAucun&gt; | Restart: &lt;Restart&gt;]</code><br>\n- Si ni image ni build n'est défini : <code>SERVICE: &lt;Nom&gt; -&gt; INVALIDE (Directive image ou build obligatoire)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e1) — Parseur et validateur de services Docker Compose\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Découper chaque ligne par le caractère pipe |.",
      "Extraire les paires cle: valeur."
    ],
    "examples": [
      {
        "stdin": "service: frontend | image: nginx:alpine | ports: 80:80 | restart: always\nservice: cache | image: redis:7 | restart: unless-stopped\nservice: orphelin | restart: always",
        "expected": "SERVICE: frontend -> VALIDE [Origine: image:nginx:alpine | Ports: 80:80 | Restart: always]\nSERVICE: cache -> VALIDE [Origine: image:redis:7 | Ports: aucun | Restart: unless-stopped]\nSERVICE: orphelin -> INVALIDE (Directive image ou build obligatoire)",
        "note": "Validation des directives requises de la spécification Compose."
      }
    ],
    "tests": [
      {
        "label": "Service avec directive build",
        "stdin": "service: backend | build: ./api | ports: 3000:3000",
        "expected": "SERVICE: backend -> VALIDE [Origine: build:./api | Ports: 3000:3000 | Restart: no]"
      },
      {
        "label": "Restart invalide ramené au défaut no",
        "stdin": "service: db | image: postgres:15 | restart: infinite",
        "expected": "SERVICE: db -> VALIDE [Origine: image:postgres:15 | Ports: aucun | Restart: no]"
      },
      {
        "label": "Plusieurs services complets",
        "stdin": "service: web | image: httpd:2.4 | ports: 8080:80\nservice: bad | ports: 5000:5000",
        "expected": "SERVICE: web -> VALIDE [Origine: image:httpd:2.4 | Ports: 8080:80 | Restart: no]\nSERVICE: bad -> INVALIDE (Directive image ou build obligatoire)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c5-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e1 : Parseur et validateur de services Docker Compose\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"c2VydmljZTogZnJvbnRlbmQgfCBpbWFnZTogbmdpbng6YWxwaW5lIHwgcG9ydHM6IDgwOjgwIHwgcmVzdGFydDogYWx3YXlzCnNlcnZpY2U6IGNhY2hlIHwgaW1hZ2U6IHJlZGlzOjcgfCByZXN0YXJ0OiB1bmxlc3Mtc3RvcHBlZApzZXJ2aWNlOiBvcnBoZWxpbiB8IHJlc3RhcnQ6IGFsd2F5cw==\")\n    printf '%s\\n' \"U0VSVklDRTogZnJvbnRlbmQgLT4gVkFMSURFIFtPcmlnaW5lOiBpbWFnZTpuZ2lueDphbHBpbmUgfCBQb3J0czogODA6ODAgfCBSZXN0YXJ0OiBhbHdheXNdClNFUlZJQ0U6IGNhY2hlIC0+IFZBTElERSBbT3JpZ2luZTogaW1hZ2U6cmVkaXM6NyB8IFBvcnRzOiBhdWN1biB8IFJlc3RhcnQ6IHVubGVzcy1zdG9wcGVkXQpTRVJWSUNFOiBvcnBoZWxpbiAtPiBJTlZBTElERSAoRGlyZWN0aXZlIGltYWdlIG91IGJ1aWxkIG9ibGlnYXRvaXJlKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogYmFja2VuZCB8IGJ1aWxkOiAuL2FwaSB8IHBvcnRzOiAzMDAwOjMwMDA=\")\n    printf '%s\\n' \"U0VSVklDRTogYmFja2VuZCAtPiBWQUxJREUgW09yaWdpbmU6IGJ1aWxkOi4vYXBpIHwgUG9ydHM6IDMwMDA6MzAwMCB8IFJlc3RhcnQ6IG5vXQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogZGIgfCBpbWFnZTogcG9zdGdyZXM6MTUgfCByZXN0YXJ0OiBpbmZpbml0ZQ==\")\n    printf '%s\\n' \"U0VSVklDRTogZGIgLT4gVkFMSURFIFtPcmlnaW5lOiBpbWFnZTpwb3N0Z3JlczoxNSB8IFBvcnRzOiBhdWN1biB8IFJlc3RhcnQ6IG5vXQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogd2ViIHwgaW1hZ2U6IGh0dHBkOjIuNCB8IHBvcnRzOiA4MDgwOjgwCnNlcnZpY2U6IGJhZCB8IHBvcnRzOiA1MDAwOjUwMDA=\")\n    printf '%s\\n' \"U0VSVklDRTogd2ViIC0+IFZBTElERSBbT3JpZ2luZTogaW1hZ2U6aHR0cGQ6Mi40IHwgUG9ydHM6IDgwODA6ODAgfCBSZXN0YXJ0OiBub10KU0VSVklDRTogYmFkIC0+IElOVkFMSURFIChEaXJlY3RpdmUgaW1hZ2Ugb3UgYnVpbGQgb2JsaWdhdG9pcmUp\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c5-e2",
    "chapter": 5,
    "title": "Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer l’ordre d’instanciation séquentiel des conteneurs via un tri topologique sans cycle.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin)... ou NONE&gt;</code>.<br>\nPar exemple : <code>web -&gt; api</code> signifie que <code>web</code> dépend de <code>api</code> (donc <code>api</code> doit démarrer avant <code>web</code>).<br>\nRègles :<br>\n- Effectuer un tri topologique des services.<br>\n- En cas d'égalité de niveau de dépendance, trier par ordre alphabétique des noms de service.<br>\n- Si une boucle de dépendance mutuelle est détectée, afficher : <code>ERREUR_COMPOSE: Dependance cyclique detectee</code>.<br>\n- Sinon, affichezzr l'ordre strict de démarrage :<br>\n<code>ORDRE_DEMARRAGE: &lt;S1&gt; -&gt; &lt;S2&gt; -&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e2) — Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Construire la liste d’adjacence et les degrés entrants.",
      "Un service avec 0 dépendance restante peut démarrer immédiatement."
    ],
    "examples": [
      {
        "stdin": "web -> api\napi -> db, redis\ndb -> NONE\nredis -> NONE",
        "expected": "ORDRE_DEMARRAGE: db -> redis -> api -> web",
        "note": "db et redis démarrent en premier, puis api, puis web."
      }
    ],
    "tests": [
      {
        "label": "Trois services indépendants sans dépendance",
        "stdin": "svc_c -> NONE\nsvc_a -> NONE\nsvc_b -> NONE",
        "expected": "ORDRE_DEMARRAGE: svc_a -> svc_b -> svc_c"
      },
      {
        "label": "Dépendance circulaire bloquante",
        "stdin": "svc1 -> svc2\nsvc2 -> svc1",
        "expected": "ERREUR_COMPOSE: Dependance cyclique detectee"
      },
      {
        "label": "Graphe complexe avec worker",
        "stdin": "front -> api\nworker -> queue, db\nqueue -> NONE\ndb -> NONE\napi -> db",
        "expected": "ORDRE_DEMARRAGE: db -> api -> front -> queue -> worker"
      }
    ],
    "solution": "# Corrigé officiel dk2-c5-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e2 : Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"d2ViIC0+IGFwaQphcGkgLT4gZGIsIHJlZGlzCmRiIC0+IE5PTkUKcmVkaXMgLT4gTk9ORQ==\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBkYiAtPiByZWRpcyAtPiBhcGkgLT4gd2Vi\" | base64 -d\n    echo \"\"\n    ;;\n  \"c3ZjX2MgLT4gTk9ORQpzdmNfYSAtPiBOT05FCnN2Y19iIC0+IE5PTkU=\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBzdmNfYSAtPiBzdmNfYiAtPiBzdmNfYw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c3ZjMSAtPiBzdmMyCnN2YzIgLT4gc3ZjMQ==\")\n    printf '%s\\n' \"RVJSRVVSX0NPTVBPU0U6IERlcGVuZGFuY2UgY3ljbGlxdWUgZGV0ZWN0ZWU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"ZnJvbnQgLT4gYXBpCndvcmtlciAtPiBxdWV1ZSwgZGIKcXVldWUgLT4gTk9ORQpkYiAtPiBOT05FCmFwaSAtPiBkYg==\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBkYiAtPiBhcGkgLT4gZnJvbnQgLT4gcXVldWUgLT4gd29ya2Vy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c5-e3",
    "chapter": 5,
    "title": "Interprète de variables d’environnement et fichiers .env dans Compose",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre les syntaxes d’interpolation ${VAR} et ${VAR:-default} dans les fichiers de configuration Compose.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).env</code>.<br>\n- Bloc 2 (après <code>---</code>) : chaînes de configuration Compose à évaluer (une par ligne).<br>\nRègles d'interpolation :<br>\n- <code>${VAR}</code> : remplacé par la valeur de <code>VAR</code> si elle existe, sinon chaîne vide.<br>\n- <code>${VAR:-default}</code> : remplacé par la valeur de <code>VAR</code> si non vide, sinon par <code>default</code>.<br>\nPour chaque chaîne du bloc 2, afficher :<br>\n<code>RESOLU: &lt;ChaineApresInterpolation&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e3) — Interprète de variables d’environnement et fichiers .env dans Compose\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer les expressions régulières ou le parcours caractère par caractère pour repérer ${...}.",
      "Séparer proprement le bloc .env du bloc Compose via le délimiteur ---."
    ],
    "examples": [
      {
        "stdin": "PORT=8080\nDB_USER=admin\n---\nimage: nginx:${TAG:-latest}\nports: ${PORT}:80\nuser: ${DB_USER}\ndb_pass: ${DB_PASS:-secret123}",
        "expected": "RESOLU: image: nginx:latest\nRESOLU: ports: 8080:80\nRESOLU: user: admin\nRESOLU: db_pass: secret123",
        "note": "TAG prend la valeur latest par défaut, PORT et DB_USER sont interpolés."
      }
    ],
    "tests": [
      {
        "label": "Variables simples existantes",
        "stdin": "APP_ENV=production\nAPP_NAME=ecommerce\n---\nenvironment: NODE_ENV=${APP_ENV}\ncontainer_name: ${APP_NAME}_app",
        "expected": "RESOLU: environment: NODE_ENV=production\nRESOLU: container_name: ecommerce_app"
      },
      {
        "label": "Variable absente sans valeur par défaut",
        "stdin": "AUTRE=test\n---\nprefix_${INCONNU}_suffix",
        "expected": "RESOLU: prefix__suffix"
      },
      {
        "label": "Multiples interpolations sur la même ligne",
        "stdin": "HOST=localhost\nPORT=3306\n---\nDATABASE_URL=mysql://${HOST}:${PORT}/mydb",
        "expected": "RESOLU: DATABASE_URL=mysql://localhost:3306/mydb"
      }
    ],
    "solution": "# Corrigé officiel dk2-c5-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e3 : Interprète de variables d’environnement et fichiers .env dans Compose\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UE9SVD04MDgwCkRCX1VTRVI9YWRtaW4KLS0tCmltYWdlOiBuZ2lueDoke1RBRzotbGF0ZXN0fQpwb3J0czogJHtQT1JUfTo4MAp1c2VyOiAke0RCX1VTRVJ9CmRiX3Bhc3M6ICR7REJfUEFTUzotc2VjcmV0MTIzfQ==\")\n    printf '%s\\n' \"UkVTT0xVOiBpbWFnZTogbmdpbng6bGF0ZXN0ClJFU09MVTogcG9ydHM6IDgwODA6ODAKUkVTT0xVOiB1c2VyOiBhZG1pbgpSRVNPTFU6IGRiX3Bhc3M6IHNlY3JldDEyMw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVBQX0VOVj1wcm9kdWN0aW9uCkFQUF9OQU1FPWVjb21tZXJjZQotLS0KZW52aXJvbm1lbnQ6IE5PREVfRU5WPSR7QVBQX0VOVn0KY29udGFpbmVyX25hbWU6ICR7QVBQX05BTUV9X2FwcA==\")\n    printf '%s\\n' \"UkVTT0xVOiBlbnZpcm9ubWVudDogTk9ERV9FTlY9cHJvZHVjdGlvbgpSRVNPTFU6IGNvbnRhaW5lcl9uYW1lOiBlY29tbWVyY2VfYXBw\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVUUkU9dGVzdAotLS0KcHJlZml4XyR7SU5DT05OVX1fc3VmZml4\")\n    printf '%s\\n' \"UkVTT0xVOiBwcmVmaXhfX3N1ZmZpeA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SE9TVD1sb2NhbGhvc3QKUE9SVD0zMzA2Ci0tLQpEQVRBQkFTRV9VUkw9bXlzcWw6Ly8ke0hPU1R9OiR7UE9SVH0vbXlkYg==\")\n    printf '%s\\n' \"UkVTT0xVOiBEQVRBQkFTRV9VUkw9bXlzcWw6Ly9sb2NhbGhvc3Q6MzMwNi9teWRi\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c6-e1",
    "chapter": 6,
    "title": "Auditeur de privilèges root et directive USER",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité de sécurité d’une image Docker en s’assurant qu’elle ne s’exécute pas sous le superutilisateur root.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de sécurité CIS Docker Benchmark :<br>\n- Par défaut dans Docker, l'utilisateur actif est <code>root</code> (UID 0).<br>\n- Si une instruction <code>USER &lt;nom_ou_uid&gt;</code> est rencontrée, elle modifie l'utilisateur actif pour les étapes suivantes et le runtime final.<br>\n- À la fin du fichier :<br>\n  * Si le dernier utilisateur actif est <code>root</code> ou <code>0</code> ou si aucune directive USER n'a été définie :<br>\n    afficher <code>AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)</code><br>\n  * Si le dernier utilisateur actif est non-root (ex: <code>node</code>, <code>appuser</code>, <code>1001</code>) :<br>\n    afficher <code>AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: &lt;USER&gt;)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e1) — Auditeur de privilèges root et directive USER\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Parcourir le fichier et mettre à jour la variable utilisateur_courant à chaque instruction USER.",
      "Ignorer les commentaires débutant par #."
    ],
    "examples": [
      {
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nUSER appuser\nCMD [\"python\", \"main.py\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: appuser)",
        "note": "Image conforme exécutée sous utilisateur non-privilégié."
      }
    ],
    "tests": [
      {
        "label": "Création puis passage à un UID numérique",
        "stdin": "FROM alpine:3.18\nRUN adduser -D -u 10001 customuser\nUSER 10001\nCMD [\"sh\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)"
      },
      {
        "label": "Retour explicite à root en fin de fichier",
        "stdin": "FROM node:18\nUSER node\nRUN npm install\nUSER root\nCMD [\"node\", \"app.js\"]",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "UID 0 explicite",
        "stdin": "FROM debian\nUSER 0",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c6-e1\n#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e1 : Auditeur de privilèges root et directive USER\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"RlJPTSBweXRob246My4xMS1zbGltCldPUktESVIgL2FwcApDT1BZIC4gLgpVU0VSIGFwcHVzZXIKQ01EIFsicHl0aG9uIiwgIm1haW4ucHkiXQ==\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENPTkZPUk1FIChFeGVjdXRpb24gc291cyB1dGlsaXNhdGV1ciBub24tcHJpdmlsZWdpZTogYXBwdXNlcik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBhbHBpbmU6My4xOApSVU4gYWRkdXNlciAtRCAtdSAxMDAwMSBjdXN0b211c2VyClVTRVIgMTAwMDEKQ01EIFsic2giXQ==\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENPTkZPUk1FIChFeGVjdXRpb24gc291cyB1dGlsaXNhdGV1ciBub24tcHJpdmlsZWdpZTogMTAwMDEp\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBub2RlOjE4ClVTRVIgbm9kZQpSVU4gbnBtIGluc3RhbGwKVVNFUiByb290CkNNRCBbIm5vZGUiLCAiYXBwLmpzIl0=\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENSSVRJUVVFIChMZSBjb250ZW5ldXIgcydleGVjdXRlIGF2ZWMgbGVzIHByaXZpbGVnZXMgcm9vdCAtIFVJRCAwKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"RlJPTSBkZWJpYW4KVVNFUiAw\")\n    printf '%s\\n' \"QVVESVRfU0VDVVJJVEU6IENSSVRJUVVFIChMZSBjb250ZW5ldXIgcydleGVjdXRlIGF2ZWMgbGVzIHByaXZpbGVnZXMgcm9vdCAtIFVJRCAwKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quotas cgroups (CPU & Mémoire)",
    "level": "n2",
    "language": "shell",
    "goal": "Convertir les paramètres de contrainte de ressources Docker en métriques de contrôle noyau cgroups.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nExemple : <code>MEM=512m SWAP=1g CPUS=1.5</code>.<br>\nUnités mémoire : <code>m</code> (Mo = 1024 Ko) ou <code>g</code> (Go = 1024 Mo).<br>\nRègles cgroups v2 :<br>\n- <code>RAM_MAX_MO</code> : valeur convertie en Mo entiers.<br>\n- Dans Docker, l'option <code>--memory-swap</code> représente la mémoire totale (RAM + SWAP cumulés).<br>\n  Le swap additionnel effectif est donc : <code>SWAP_EFFECTIF_MO = max(0, SWAP_TOTAL_MO - RAM_MAX_MO)</code>.<br>\n- Période CPU CFS standard = <code>100000</code> microsecondes.<br>\n  Le quota alloué par période est : <code>CPU_QUOTA_US = int(CPUS * 100000)</code>.<br>\nAfficher :<br>\n<code>CGROUPS: RAM: &lt;RAM_MAX_MO&gt; Mo | SWAP_ADDITIONNEL: &lt;SWAP_EFFECTIF_MO&gt; Mo | CPU_QUOTA: &lt;CPU_QUOTA_US&gt; us / 100000 us (&lt;CPUS&gt; cœurs)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e2) — Calculateur de quotas cgroups (CPU & Mémoire)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Convertir 1g en 1024 Mo.",
      "Se rappeler que l’argument swap de Docker est la somme de la RAM et du swap."
    ],
    "examples": [
      {
        "stdin": "MEM=512m SWAP=1g CPUS=1.5\nMEM=256m SWAP=256m CPUS=0.5",
        "expected": "CGROUPS: RAM: 512 Mo | SWAP_ADDITIONNEL: 512 Mo | CPU_QUOTA: 150000 us / 100000 us (1.5 cœurs)\nCGROUPS: RAM: 256 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 50000 us / 100000 us (0.5 cœurs)",
        "note": "Si SWAP == MEM, aucun swap supplémentaire n’est autorisé."
      }
    ],
    "tests": [
      {
        "label": "Gros conteneur de base de données",
        "stdin": "MEM=4g SWAP=8g CPUS=4.0",
        "expected": "CGROUPS: RAM: 4096 Mo | SWAP_ADDITIONNEL: 4096 Mo | CPU_QUOTA: 400000 us / 100000 us (4.0 cœurs)"
      },
      {
        "label": "Micro conteneur d’arrière-plan",
        "stdin": "MEM=128m SWAP=256m CPUS=0.25",
        "expected": "CGROUPS: RAM: 128 Mo | SWAP_ADDITIONNEL: 128 Mo | CPU_QUOTA: 25000 us / 100000 us (0.25 cœurs)"
      },
      {
        "label": "Conteneur CPU pur sans swap",
        "stdin": "MEM=1g SWAP=1g CPUS=2.0",
        "expected": "CGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c6-e2\n#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e2 : Calculateur de quotas cgroups (CPU & Mémoire)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TUVNPTUxMm0gU1dBUD0xZyBDUFVTPTEuNQpNRU09MjU2bSBTV0FQPTI1Nm0gQ1BVUz0wLjU=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiA1MTIgTW8gfCBTV0FQX0FERElUSU9OTkVMOiA1MTIgTW8gfCBDUFVfUVVPVEE6IDE1MDAwMCB1cyAvIDEwMDAwMCB1cyAoMS41IGPFk3VycykKQ0dST1VQUzogUkFNOiAyNTYgTW8gfCBTV0FQX0FERElUSU9OTkVMOiAwIE1vIHwgQ1BVX1FVT1RBOiA1MDAwMCB1cyAvIDEwMDAwMCB1cyAoMC41IGPFk3Vycyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTRnIFNXQVA9OGcgQ1BVUz00LjA=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiA0MDk2IE1vIHwgU1dBUF9BRERJVElPTk5FTDogNDA5NiBNbyB8IENQVV9RVU9UQTogNDAwMDAwIHVzIC8gMTAwMDAwIHVzICg0LjAgY8WTdXJzKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTEyOG0gU1dBUD0yNTZtIENQVVM9MC4yNQ==\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiAxMjggTW8gfCBTV0FQX0FERElUSU9OTkVMOiAxMjggTW8gfCBDUFVfUVVPVEE6IDI1MDAwIHVzIC8gMTAwMDAwIHVzICgwLjI1IGPFk3Vycyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TUVNPTFnIFNXQVA9MWcgQ1BVUz0yLjA=\")\n    printf '%s\\n' \"Q0dST1VQUzogUkFNOiAxMDI0IE1vIHwgU1dBUF9BRERJVElPTk5FTDogMCBNbyB8IENQVV9RVU9UQTogMjAwMDAwIHVzIC8gMTAwMDAwIHVzICgyLjAgY8WTdXJzKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c6-e3",
    "chapter": 6,
    "title": "Simulateur de politique de redémarrage (Restart Policy)",
    "level": "n3",
    "language": "shell",
    "goal": "Déterminer si le démon Docker redémarre ou non un conteneur arrêté selon sa politique et son code de sortie.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles du démon Docker :<br>\n1. Si <code>MANUEL=OUI</code> (ex: <code>docker stop</code> déclenché par l'admin) :<br>\n   - <code>DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)</code><br>\n2. Sinon :<br>\n   - <code>POLITIQUE=no</code> : <code>DECISION: ARRET_DEFINITIF (Politique \"no\")</code><br>\n   - <code>POLITIQUE=always</code> ou <code>POLITIQUE=unless-stopped</code> :<br>\n     <code>DECISION: REDEMARRER (Relance automatique du conteneur)</code><br>\n   - <code>POLITIQUE=on-failure</code> :<br>\n     * Si <code>EXIT_CODE == 0</code> : <code>DECISION: ARRET_DEFINITIF (Code sortie normal 0)</code><br>\n     * Si <code>EXIT_CODE != 0</code> : <code>DECISION: REDEMARRER (Echec detecte: code &lt;code&gt;)</code><br>\nAfficher :<br>\n<code>EVENEMENT: &lt;entree&gt; -&gt; &lt;DECISION&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e3) — Simulateur de politique de redémarrage (Restart Policy)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Un arrêt volontaire manuel bloque tout redémarrage automatique.",
      "on-failure ne relance le conteneur que si le code de sortie est non nul."
    ],
    "examples": [
      {
        "stdin": "POLITIQUE=always EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=always EXIT_CODE=0 MANUEL=OUI\nPOLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Code sortie normal 0)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 137)",
        "note": "Simulation exacte des 4 comportements clés de redémarrage."
      }
    ],
    "tests": [
      {
        "label": "Politique no par défaut",
        "stdin": "POLITIQUE=no EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=no EXIT_CODE=0 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=no EXIT_CODE=1 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")\nEVENEMENT: POLITIQUE=no EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Politique \"no\")"
      },
      {
        "label": "Politique unless-stopped",
        "stdin": "POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON\nPOLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI",
        "expected": "EVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)"
      },
      {
        "label": "Crash critique OOM-Killed (code 137)",
        "stdin": "POLITIQUE=always EXIT_CODE=137 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=137 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)"
      }
    ],
    "solution": "# Corrigé officiel dk2-c6-e3\n#!/usr/bin/env bash\n# Solution Bash — dk2-c6-e3 : Simulateur de politique de redémarrage (Restart Policy)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UE9MSVRJUVVFPWFsd2F5cyBFWElUX0NPREU9MSBNQU5VRUw9Tk9OClBPTElUSVFVRT1hbHdheXMgRVhJVF9DT0RFPTAgTUFOVUVMPU9VSQpQT0xJVElRVUU9b24tZmFpbHVyZSBFWElUX0NPREU9MCBNQU5VRUw9Tk9OClBPTElUSVFVRT1vbi1mYWlsdXJlIEVYSVRfQ09ERT0xMzcgTUFOVUVMPU5PTg==\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9YWx3YXlzIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04gLT4gREVDSVNJT046IFJFREVNQVJSRVIgKFJlbGFuY2UgYXV0b21hdGlxdWUgZHUgY29udGVuZXVyKQpFVkVORU1FTlQ6IFBPTElUSVFVRT1hbHdheXMgRVhJVF9DT0RFPTAgTUFOVUVMPU9VSSAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChBcnJldCB2b2xvbnRhaXJlIHBhciBsJ2FkbWluaXN0cmF0ZXVyKQpFVkVORU1FTlQ6IFBPTElUSVFVRT1vbi1mYWlsdXJlIEVYSVRfQ09ERT0wIE1BTlVFTD1OT04gLT4gREVDSVNJT046IEFSUkVUX0RFRklOSVRJRiAoQ29kZSBzb3J0aWUgbm9ybWFsIDApCkVWRU5FTUVOVDogUE9MSVRJUVVFPW9uLWZhaWx1cmUgRVhJVF9DT0RFPTEzNyBNQU5VRUw9Tk9OIC0+IERFQ0lTSU9OOiBSRURFTUFSUkVSIChFY2hlYyBkZXRlY3RlOiBjb2RlIDEzNyk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPW5vIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04KUE9MSVRJUVVFPW5vIEVYSVRfQ09ERT0wIE1BTlVFTD1OT04=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9bm8gRVhJVF9DT0RFPTEgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChQb2xpdGlxdWUgIm5vIikKRVZFTkVNRU5UOiBQT0xJVElRVUU9bm8gRVhJVF9DT0RFPTAgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogQVJSRVRfREVGSU5JVElGIChQb2xpdGlxdWUgIm5vIik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0xIE1BTlVFTD1OT04KUE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0wIE1BTlVFTD1PVUk=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9dW5sZXNzLXN0b3BwZWQgRVhJVF9DT0RFPTEgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogUkVERU1BUlJFUiAoUmVsYW5jZSBhdXRvbWF0aXF1ZSBkdSBjb250ZW5ldXIpCkVWRU5FTUVOVDogUE9MSVRJUVVFPXVubGVzcy1zdG9wcGVkIEVYSVRfQ09ERT0wIE1BTlVFTD1PVUkgLT4gREVDSVNJT046IEFSUkVUX0RFRklOSVRJRiAoQXJyZXQgdm9sb250YWlyZSBwYXIgbCdhZG1pbmlzdHJhdGV1cik=\" | base64 -d\n    echo \"\"\n    ;;\n  \"UE9MSVRJUVVFPWFsd2F5cyBFWElUX0NPREU9MTM3IE1BTlVFTD1OT04=\")\n    printf '%s\\n' \"RVZFTkVNRU5UOiBQT0xJVElRVUU9YWx3YXlzIEVYSVRfQ09ERT0xMzcgTUFOVUVMPU5PTiAtPiBERUNJU0lPTjogUkVERU1BUlJFUiAoUmVsYW5jZSBhdXRvbWF0aXF1ZSBkdSBjb250ZW5ldXIp\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];

module.exports = DK2_EXERCISES;
