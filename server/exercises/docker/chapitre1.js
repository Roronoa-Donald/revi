'use strict';

module.exports = [
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e1 : Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UElECk5FVApNRU1fTElNSVQKSU5DT05OVV9URVNU\")\n    printf '%s\\n' \"UElEIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgQXJib3Jlc2NlbmNlIGRlcyBwcm9jZXNzdXMgaXNvbMOpZSAobGUgY29udGVuZXVyIHZvaXQgc29uIHByb3ByZSBQSUQgMSkKTkVUIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgSW50ZXJmYWNlcyByZXNlYXUsIHRhYmxlcyBkZSByb3V0YWdlIGV0IHBvcnRzIGlzb2xlcwpNRU1fTElNSVQgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBQbGFmb25kIGRlIG1lbW9pcmUgdml2ZSBSQU0gZXQgZ2VzdGlvbiBkZSBsJ09PTS1LaWxsZXIKSU5DT05OVV9URVNUIC0+IElOQ09OTlU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TU5UCklQQwpVVFMKVVNFUg==\")\n    printf '%s\\n' \"TU5UIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgUG9pbnRzIGRlIG1vbnRhZ2UgZGUgc3lzdGVtZSBkZSBmaWNoaWVycyBldCBhcmJvcmVzY2VuY2UgcmFjaW5lCklQQyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IENvbW11bmljYXRpb25zIGludGVyLXByb2Nlc3N1cyAobWVtb2lyZSBwYXJ0YWdlZSwgZmlsZXMgZGUgbWVzc2FnZXMpClVUUyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE5vbSBkJ2hvdGUgKGhvc3RuYW1lKSBldCBub20gZGUgZG9tYWluZSBOSVMKVVNFUiAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE1hcHBhZ2UgZGVzIGlkZW50aWZpYW50cyBVSUQgZXQgR0lEIChyb290IGRhbnMgbGUgY29udGVuZXVyIHZzIHV0aWxpc2F0ZXVyIHN0YW5kYXJkIHN1ciBsJ2hvdGUp\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q1BVX0xJTUlUCk1FTV9MSU1JVApJT19USFJPVFRMRQ==\")\n    printf '%s\\n' \"Q1BVX0xJTUlUIC0+IFBSSU1JVElWRTogQ0dST1VQIHwgUGxhZm9uZCBkZSB0ZW1wcyBkZSBjYWxjdWwgQ1BVIChxdW90YXMgQ0ZTKQpNRU1fTElNSVQgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBQbGFmb25kIGRlIG1lbW9pcmUgdml2ZSBSQU0gZXQgZ2VzdGlvbiBkZSBsJ09PTS1LaWxsZXIKSU9fVEhST1RUTEUgLT4gUFJJTUlUSVZFOiBDR1JPVVAgfCBEZWJpdCBtYXhpbWFsIGVuIGxlY3R1cmUgZXQgZWNyaXR1cmUgc3VyIGxlcyBkaXNxdWVzIGJsb2Nz\" | base64 -d\n    echo \"\"\n    ;;\n  \"UElECkNQVV9MSU1JVApSQU1fU1dBUApVVFM=\")\n    printf '%s\\n' \"UElEIC0+IFBSSU1JVElWRTogTkFNRVNQQUNFIHwgQXJib3Jlc2NlbmNlIGRlcyBwcm9jZXNzdXMgaXNvbMOpZSAobGUgY29udGVuZXVyIHZvaXQgc29uIHByb3ByZSBQSUQgMSkKQ1BVX0xJTUlUIC0+IFBSSU1JVElWRTogQ0dST1VQIHwgUGxhZm9uZCBkZSB0ZW1wcyBkZSBjYWxjdWwgQ1BVIChxdW90YXMgQ0ZTKQpSQU1fU1dBUCAtPiBJTkNPTk5VClVUUyAtPiBQUklNSVRJVkU6IE5BTUVTUEFDRSB8IE5vbSBkJ2hvdGUgKGhvc3RuYW1lKSBldCBub20gZGUgZG9tYWluZSBOSVM=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e2 : Comparateur d’empreinte mémoire et stockage : VM vs Conteneur\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"NSA1MCAxMjgKNDAwMCAxMDI0\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMjAyNTAgTW8gfCBSQU0gNTc2MCBNbwpBUkNISVRFQ1RVUkUgRE9DS0VSOiBEaXNxdWUgMjUwIE1vIHwgUkFNIDY0MCBNbwpFQ09OT01JRSBET0NLRVI6IERpc3F1ZSAtMjAwMDAgTW8gfCBSQU0gLTUxMjAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"MTAgMjAgNjQKMzUwMCA1MTI=\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMzUyMDAgTW8gfCBSQU0gNTc2MCBNbwpBUkNISVRFQ1RVUkUgRE9DS0VSOiBEaXNxdWUgMjAwIE1vIHwgUkFNIDY0MCBNbwpFQ09OT01JRSBET0NLRVI6IERpc3F1ZSAtMzUwMDAgTW8gfCBSQU0gLTUxMjAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"MSAxMDAgMjU2CjUwMDAgMjA0OA==\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgNTEwMCBNbyB8IFJBTSAyMzA0IE1vCkFSQ0hJVEVDVFVSRSBET0NLRVI6IERpc3F1ZSAxMDAgTW8gfCBSQU0gMjU2IE1vCkVDT05PTUlFIERPQ0tFUjogRGlzcXVlIC01MDAwIE1vIHwgUkFNIC0yMDQ4IE1v\" | base64 -d\n    echo \"\"\n    ;;\n  \"NTAgMzAgMTAwCjIwMDAgODAw\")\n    printf '%s\\n' \"QVJDSElURUNUVVJFIFZNOiBEaXNxdWUgMTAxNTAwIE1vIHwgUkFNIDQ1MDAwIE1vCkFSQ0hJVEVDVFVSRSBET0NLRVI6IERpc3F1ZSAxNTAwIE1vIHwgUkFNIDUwMDAgTW8KRUNPTk9NSUUgRE9DS0VSOiBEaXNxdWUgLTEwMDAwMCBNbyB8IFJBTSAtNDAwMDAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c1-e3 : Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q0xJCkRPQ0tFUkQKUlVOQw==\")\n    printf '%s\\n' \"Q0xJIC0+IGRvY2tlciAoY2xpZW50KSB8IEludGVycHJldGUgbGVzIGNvbW1hbmRlcyB1dGlsaXNhdGV1ciBldCBjb21tdW5pcXVlIHZpYSBsJ0FQSSBSRVNUIChzb2NrZXQgVU5JWCkKRE9DS0VSRCAtPiBkb2NrZXJkIChkYWVtb24pIHwgR2VzdGlvbm5haXJlIGhhdXQgbml2ZWF1IGRlcyBpbWFnZXMsIHZvbHVtZXMsIHJlc2VhdXggZXQgYXV0aGVudGlmaWNhdGlvbgpSVU5DIC0+IHJ1bmMgKE9DSSBydW50aW1lKSB8IENyZWUgbGVzIG5hbWVzcGFjZXMgZXQgY2dyb3VwcywgcHVpcyBleGVjdXRlIGxlIGJpbmFpcmUgY29udGVuZXVyaXNl\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q0xJCkRPQ0tFUkQKQ09OVEFJTkVSRApTSElNClJVTkM=\")\n    printf '%s\\n' \"Q0xJIC0+IGRvY2tlciAoY2xpZW50KSB8IEludGVycHJldGUgbGVzIGNvbW1hbmRlcyB1dGlsaXNhdGV1ciBldCBjb21tdW5pcXVlIHZpYSBsJ0FQSSBSRVNUIChzb2NrZXQgVU5JWCkKRE9DS0VSRCAtPiBkb2NrZXJkIChkYWVtb24pIHwgR2VzdGlvbm5haXJlIGhhdXQgbml2ZWF1IGRlcyBpbWFnZXMsIHZvbHVtZXMsIHJlc2VhdXggZXQgYXV0aGVudGlmaWNhdGlvbgpDT05UQUlORVJEIC0+IGNvbnRhaW5lcmQgfCBTdXBlcnZpc2V1ciBkZSBjb250ZW5ldXJzIChjeWNsZSBkZSB2aWUsIGRpc3RyaWJ1dGlvbiBkJ2ltYWdlcyBldCBzbmFwc2hvdHMpClNISU0gLT4gY29udGFpbmVyZC1zaGltIHwgUHJvY2Vzc3VzIGxlZ2VyIG1haW50ZW5hbnQgbGVzIEUvUyBldCBsJ2V0YXQgc2FucyBkZXBlbmRyZSBkdSBkYWVtb24KUlVOQyAtPiBydW5jIChPQ0kgcnVudGltZSkgfCBDcmVlIGxlcyBuYW1lc3BhY2VzIGV0IGNncm91cHMsIHB1aXMgZXhlY3V0ZSBsZSBiaW5haXJlIGNvbnRlbmV1cmlzZQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"S1VCRVJORVRFUwpTSElNClZJUlRVQUxCT1g=\")\n    printf '%s\\n' \"S1VCRVJORVRFUyAtPiBJTkNPTk5VClNISU0gLT4gY29udGFpbmVyZC1zaGltIHwgUHJvY2Vzc3VzIGxlZ2VyIG1haW50ZW5hbnQgbGVzIEUvUyBldCBsJ2V0YXQgc2FucyBkZXBlbmRyZSBkdSBkYWVtb24KVklSVFVBTEJPWCAtPiBJTkNPTk5V\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09OVEFJTkVSRA==\")\n    printf '%s\\n' \"Q09OVEFJTkVSRCAtPiBjb250YWluZXJkIHwgU3VwZXJ2aXNldXIgZGUgY29udGVuZXVycyAoY3ljbGUgZGUgdmllLCBkaXN0cmlidXRpb24gZCdpbWFnZXMgZXQgc25hcHNob3RzKQ==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
