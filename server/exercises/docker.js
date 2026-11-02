'use strict';

const DK2_EXERCISES = [
  {
    "id": "dk2-c1-e1",
    "chapter": 1,
    "title": "Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)",
    "level": "n1",
    "language": "shell",
    "goal": "Distinguer les primitives du noyau Linux sous-jacentes à Docker : Namespaces (vue isolée) et Cgroups (limitation des ressources).",
    "brief": "<p>Le script Bash lit un code par ligne non vide sur l’entrée standard (stdin). La recherche ignore la casse et la sortie conserve le code saisi.<br>\nSelon les fondements de la conteneurisation :<br>\n- <strong>Namespaces (Isolation de l'espace de visibilité)</strong> :<br>\n  * <code>PID</code> -&gt; <code>Arborescence des processus isolée (le conteneur voit son propre PID 1)</code><br>\n  * <code>NET</code> -&gt; <code>Interfaces reseau, tables de routage et ports isoles</code><br>\n  * <code>MNT</code> -&gt; <code>Points de montage de systeme de fichiers et arborescence racine</code><br>\n  * <code>IPC</code> -&gt; <code>Communications inter-processus (memoire partagee, files de messages)</code><br>\n  * <code>UTS</code> -&gt; <code>Nom d'hote (hostname) et nom de domaine NIS</code><br>\n  * <code>USER</code> -&gt; <code>Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)</code><br>\nLe mappage USER ci-dessus est un exemple : la correspondance des UID dépend de la configuration et n'est pas systématiquement différente entre hôte et conteneur.<br>\n- <strong>Cgroups (Contrôle et limitation des ressources)</strong> :<br>\n  * <code>CPU_LIMIT</code> -&gt; <code>Plafond de temps de calcul CPU (quotas CFS)</code><br>\n  * <code>MEM_LIMIT</code> -&gt; <code>Plafond de memoire vive RAM et gestion de l'OOM-Killer</code><br>\n  * <code>IO_THROTTLE</code> -&gt; <code>Debit maximal en lecture et ecriture sur les disques blocs</code><br>\nPour chaque entrée, afficher :<br>\n<code>&lt;MECANISME&gt; -&gt; PRIMITIVE: &lt;NAMESPACE|CGROUP&gt; | &lt;DESCRIPTION&gt;</code><br>\nSi le mécanisme n'est pas reconnu :<br>\n<code>&lt;MECANISME&gt; -&gt; INCONNU</code></p>",
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
        "label": "Casse mixte et code inconnu",
        "stdin": "pid\nio_throttle\nNOPE",
        "expected": "pid -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)\nio_throttle -> PRIMITIVE: CGROUP | Debit maximal en lecture et ecriture sur les disques blocs\nNOPE -> INCONNU"
      },
      {
        "label": "Doublons conservés dans leur ordre",
        "stdin": "NET\nNET\nunknown",
        "expected": "NET -> PRIMITIVE: NAMESPACE | Interfaces reseau, tables de routage et ports isoles\nNET -> PRIMITIVE: NAMESPACE | Interfaces reseau, tables de routage et ports isoles\nunknown -> INCONNU"
      },
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
      },
      {
        "label": "Aucun mécanisme",
        "stdin": "",
        "expected": ""
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  type[\"PID\"] = type[\"NET\"] = type[\"MNT\"] = type[\"IPC\"] = type[\"UTS\"] = type[\"USER\"] = \"NAMESPACE\"\n  type[\"CPU_LIMIT\"] = type[\"MEM_LIMIT\"] = type[\"IO_THROTTLE\"] = \"CGROUP\"\n  description[\"PID\"] = \"Arborescence des processus isolée (le conteneur voit son propre PID 1)\"\n  description[\"NET\"] = \"Interfaces reseau, tables de routage et ports isoles\"\n  description[\"MNT\"] = \"Points de montage de systeme de fichiers et arborescence racine\"\n  description[\"IPC\"] = \"Communications inter-processus (memoire partagee, files de messages)\"\n  description[\"UTS\"] = \"Nom d\\047hote (hostname) et nom de domaine NIS\"\n  description[\"USER\"] = \"Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l\\047hote)\"\n  description[\"CPU_LIMIT\"] = \"Plafond de temps de calcul CPU (quotas CFS)\"\n  description[\"MEM_LIMIT\"] = \"Plafond de memoire vive RAM et gestion de l\\047OOM-Killer\"\n  description[\"IO_THROTTLE\"] = \"Debit maximal en lecture et ecriture sur les disques blocs\"\n}\nNF {\n  code = toupper($0)\n  if (code in type) printf \"%s -> PRIMITIVE: %s | %s\\n\", $0, type[code], description[code]\n  else printf \"%s -> INCONNU\\n\", $0\n}\n'\n"
  },
  {
    "id": "dk2-c1-e2",
    "chapter": 1,
    "title": "Comparateur d’empreinte mémoire et stockage : VM vs Conteneur",
    "level": "n2",
    "language": "shell",
    "goal": "Quantifier l’overhead de virtualisation lourde (Hyperviseur + Guest OS complet) face à la conteneurisation légère.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin). Les valeurs sont des entiers positifs ou nuls.<br>\n- Première ligne : <code>&lt;NbInstances&gt; &lt;TailleAppMo&gt; &lt;RamAppMo&gt;</code>.<br>\n- Deuxième ligne : <code>&lt;TailleGuestOsMo&gt; &lt;RamGuestOsMo&gt;</code> (ressources consommées par l'OS invité dans une machine virtuelle).<br>\nCe calcul est un modèle simplifié : il suppose une copie de l'application par instance, le noyau de l'hôte partagé et aucun autre coût. Il ne mesure pas les ressources réelles d'une installation Docker.<br>\nCalculer :<br>\n1. <strong>VM</strong> :<br>\n   - Disque total VM = <code>NbInstances * (TailleAppMo + TailleGuestOsMo)</code><br>\n   - RAM totale VM = <code>NbInstances * (RamAppMo + RamGuestOsMo)</code><br>\n2. <strong>DOCKER</strong> :<br>\n   - Disque total Docker = <code>NbInstances * TailleAppMo</code><br>\n   - RAM totale Docker = <code>NbInstances * RamAppMo</code><br>\n3. <strong>GAINS</strong> :<br>\n   - Gain disque = <code>Disque VM - Disque Docker</code><br>\n   - Gain RAM = <code>RAM VM - RAM Docker</code><br>\nAfficher :<br>\n<code>ARCHITECTURE VM: Disque &lt;Dvm&gt; Mo | RAM &lt;Rvm&gt; Mo</code><br>\n<code>ARCHITECTURE DOCKER: Disque &lt;Ddoc&gt; Mo | RAM &lt;Rdoc&gt; Mo</code><br>\n<code>ECONOMIE DOCKER: Disque -&lt;GainD&gt; Mo | RAM -&lt;GainR&gt; Mo</code></p>",
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
        "label": "Aucune instance",
        "stdin": "0 35 60\n1000 512",
        "expected": "ARCHITECTURE VM: Disque 0 Mo | RAM 0 Mo\nARCHITECTURE DOCKER: Disque 0 Mo | RAM 0 Mo\nECONOMIE DOCKER: Disque -0 Mo | RAM -0 Mo"
      },
      {
        "label": "Une ressource applicative et une ressource invitée nulles",
        "stdin": "2 0 8\n100 0",
        "expected": "ARCHITECTURE VM: Disque 200 Mo | RAM 16 Mo\nARCHITECTURE DOCKER: Disque 0 Mo | RAM 16 Mo\nECONOMIE DOCKER: Disque -200 Mo | RAM -0 Mo"
      },
      {
        "label": "10 microservices légers",
        "stdin": "10 20 64\n3500 512",
        "expected": "ARCHITECTURE VM: Disque 35200 Mo | RAM 5760 Mo\nARCHITECTURE DOCKER: Disque 200 Mo | RAM 640 Mo\nECONOMIE DOCKER: Disque -35000 Mo | RAM -5120 Mo"
      },
      {
        "label": "Entiers décimaux au-delà de 2^53",
        "stdin": "1 9007199254740995 9\n11 5",
        "expected": "ARCHITECTURE VM: Disque 9007199254741006 Mo | RAM 14 Mo\nARCHITECTURE DOCKER: Disque 9007199254740995 Mo | RAM 9 Mo\nECONOMIE DOCKER: Disque -11 Mo | RAM -5 Mo"
      },
      {
        "label": "Forte charge 50 instances",
        "stdin": "50 30 100\n2000 800",
        "expected": "ARCHITECTURE VM: Disque 101500 Mo | RAM 45000 Mo\nARCHITECTURE DOCKER: Disque 1500 Mo | RAM 5000 Mo\nECONOMIE DOCKER: Disque -100000 Mo | RAM -40000 Mo"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction normalize_decimal(value) {\n  sub(/^[+]/, \"\", value)\n  sub(/^0+/, \"\", value)\n  return value == \"\" ? \"0\" : value\n}\nfunction add_decimal(left, right, left_index, right_index, carry, total, result) {\n  left_index = length(left)\n  right_index = length(right)\n  carry = 0\n  result = \"\"\n  while (left_index > 0 || right_index > 0 || carry > 0) {\n    total = carry\n    if (left_index > 0) total += substr(left, left_index--, 1)\n    if (right_index > 0) total += substr(right, right_index--, 1)\n    result = (total % 10) result\n    carry = int(total / 10)\n  }\n  return result\n}\nfunction multiply_decimal(left, right, left_parts, right_parts, product, left_count, right_count, position, start, row, column, carry, total, highest, result) {\n  left = normalize_decimal(left)\n  right = normalize_decimal(right)\n  if (left == \"0\" || right == \"0\") return \"0\"\n  left_count = 0\n  for (position = length(left); position > 0; position -= 7) {\n    start = position - 6\n    if (start < 1) start = 1\n    left_parts[++left_count] = substr(left, start, position - start + 1) + 0\n  }\n  right_count = 0\n  for (position = length(right); position > 0; position -= 7) {\n    start = position - 6\n    if (start < 1) start = 1\n    right_parts[++right_count] = substr(right, start, position - start + 1) + 0\n  }\n  for (row = 1; row <= left_count; row++) {\n    carry = 0\n    for (column = 1; column <= right_count; column++) {\n      total = product[row + column - 1] + left_parts[row] * right_parts[column] + carry\n      product[row + column - 1] = total % 10000000\n      carry = int(total / 10000000)\n    }\n    product[row + right_count] = carry\n  }\n  highest = left_count + right_count\n  if (product[highest] == 0) highest--\n  result = sprintf(\"%d\", product[highest])\n  for (position = highest - 1; position > 0; position--) result = result sprintf(\"%07d\", product[position])\n  return result\n}\nNR == 1 { instances = $1; app_disk = $2; app_ram = $3 }\nNR == 2 {\n  docker_disk = multiply_decimal(instances, app_disk)\n  docker_ram = multiply_decimal(instances, app_ram)\n  guest_disk = multiply_decimal(instances, $1)\n  guest_ram = multiply_decimal(instances, $2)\n  vm_disk = add_decimal(docker_disk, guest_disk)\n  vm_ram = add_decimal(docker_ram, guest_ram)\n  printf \"ARCHITECTURE VM: Disque %s Mo | RAM %s Mo\\n\", vm_disk, vm_ram\n  printf \"ARCHITECTURE DOCKER: Disque %s Mo | RAM %s Mo\\n\", docker_disk, docker_ram\n  printf \"ECONOMIE DOCKER: Disque -%s Mo | RAM -%s Mo\\n\", guest_disk, guest_ram\n}\n'\n"
  },
  {
    "id": "dk2-c1-e3",
    "chapter": 1,
    "title": "Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)",
    "level": "n3",
    "language": "shell",
    "goal": "Identifier le rôle de chaque brique logicielle composant la stack Docker moderne conforme OCI.",
    "brief": "<p>Le script Bash lit un identifiant par ligne non vide sur l’entrée standard (stdin).<br>\nSelon l'architecture interne de Docker :<br>\n- <code>CLI</code> : <code>docker (client) -&gt; Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)</code><br>\n- <code>DOCKERD</code> : <code>dockerd (daemon) -&gt; Gestionnaire haut niveau des images, volumes, reseaux et authentification</code><br>\n- <code>CONTAINERD</code> : <code>containerd -&gt; Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)</code><br>\n- <code>SHIM</code> : <code>containerd-shim -&gt; Processus leger maintenant les E/S et l'etat sans dependre du daemon</code><br>\n- <code>RUNC</code> : <code>runc (OCI runtime) -&gt; Cree les namespaces et cgroups, puis execute le binaire conteneurise</code><br>\nPour chaque opération, afficher :<br>\n<code>&lt;ID&gt; -&gt; &lt;COMPOSANT&gt; | &lt;ROLE&gt;</code><br>\nSi l'opération n'est pas listée :<br>\n<code>&lt;ID&gt; -&gt; INCONNU</code></p>",
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
        "label": "Composants répétés et inconnu",
        "stdin": "DOCKERD\nMYSTERE\nDOCKERD",
        "expected": "DOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification\nMYSTERE -> INCONNU\nDOCKERD -> dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification"
      },
      {
        "label": "Chaîne de composants dans un nouvel ordre",
        "stdin": "RUNC\nSHIM\nCLI",
        "expected": "RUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise\nSHIM -> containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon\nCLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)"
      },
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
      },
      {
        "label": "Aucun composant",
        "stdin": "",
        "expected": ""
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  component[\"CLI\"] = \"docker (client)\"\n  component[\"DOCKERD\"] = \"dockerd (daemon)\"\n  component[\"CONTAINERD\"] = \"containerd\"\n  component[\"SHIM\"] = \"containerd-shim\"\n  component[\"RUNC\"] = \"runc (OCI runtime)\"\n  role[\"CLI\"] = \"Interprete les commandes utilisateur et communique via l\\047API REST (socket UNIX)\"\n  role[\"DOCKERD\"] = \"Gestionnaire haut niveau des images, volumes, reseaux et authentification\"\n  role[\"CONTAINERD\"] = \"Superviseur de conteneurs (cycle de vie, distribution d\\047images et snapshots)\"\n  role[\"SHIM\"] = \"Processus leger maintenant les E/S et l\\047etat sans dependre du daemon\"\n  role[\"RUNC\"] = \"Cree les namespaces et cgroups, puis execute le binaire conteneurise\"\n}\nNF {\n  if ($0 in component) printf \"%s -> %s | %s\\n\", $0, component[$0], role[$0]\n  else printf \"%s -> INCONNU\\n\", $0\n}\n'\n"
  },
  {
    "id": "dk2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de taille d’image et déduplication des Layers (OverlayFS)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).",
    "brief": "<p>Le script Bash lit une image par ligne sur l’entrée standard (stdin), au format <code>NomImage : id_couche:taille , id_couche:taille</code>. Les tailles sont des entiers positifs ou nuls en Mo ; un même identifiant de couche a toujours la même taille.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n'est stockée qu'une seule fois sur le disque hôte, quel que soit le nombre d'images qui s'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l'hôte (somme des couches uniques sans doublon).<br>\n4. L'économie d'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>",
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
        "label": "Couche partagée de taille nulle",
        "stdin": "Un : shared:0, code:1\nDeux : shared:0, second:2",
        "expected": "IMAGE: Un -> TAILLE_APPARENTE: 1 Mo\nIMAGE: Deux -> TAILLE_APPARENTE: 2 Mo\nTOTAL_BRUT: 3 Mo | TOTAL_REEL: 3 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Couche partagée trois fois",
        "stdin": "One : seed:6\nTwo : seed:6, tail:0\nThree : seed:6",
        "expected": "IMAGE: One -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Two -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Three -> TAILLE_APPARENTE: 6 Mo\nTOTAL_BRUT: 18 Mo | TOTAL_REEL: 6 Mo | ECONOMIE_DEDUPLICATION: -12 Mo"
      },
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
      },
      {
        "label": "Aucune image",
        "stdin": "",
        "expected": "TOTAL_BRUT: 0 Mo | TOTAL_REEL: 0 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  colon = index($0, \":\")\n  image = trim(substr($0, 1, colon - 1))\n  count = split(substr($0, colon + 1), layers, \",\")\n  apparent = 0\n  for (index_layer = 1; index_layer <= count; index_layer++) {\n    split(layers[index_layer], pair, \":\")\n    id = trim(pair[1])\n    size = trim(pair[2]) + 0\n    apparent += size\n    if (!(id in seen)) { seen[id] = 1; real += size }\n  }\n  total += apparent\n  printf \"IMAGE: %s -> TAILLE_APPARENTE: %.0f Mo\\n\", image, apparent\n}\nEND { printf \"TOTAL_BRUT: %.0f Mo | TOTAL_REEL: %.0f Mo | ECONOMIE_DEDUPLICATION: -%.0f Mo\\n\", total, real, total - real }\n'\n"
  },
  {
    "id": "dk2-c2-e2",
    "chapter": 2,
    "title": "Parseur canonique de références d’images et de tags",
    "level": "n2",
    "language": "shell",
    "goal": "Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si le dernier segment après le dernier slash contient <code>:&lt;tag&gt;</code> (hors du digest), l'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si le premier segment avant un slash contient un point ou un port, ou vaut <code>localhost</code>, il désigne le registre (ex. <code>localhost:5000/org/app</code>).<br>\n   - Si l'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l'image.<br>\n   - Si l'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nLe modèle affiche <code>latest</code> pour un tag absent, même en présence d'un digest ; il ne valide pas la longueur des exemples de digest et ne réécrit pas la référence.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>",
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
        "label": "Registre local, espace de noms et registre distant",
        "stdin": "localhost:5000/app\nteam/service\nexample.org/worker:v2",
        "expected": "REF: localhost:5000/app -> REGISTRE: localhost:5000 | IMAGE: app | TAG: latest | DIGEST: NONE\nREF: team/service -> REGISTRE: docker.io | IMAGE: team/service | TAG: latest | DIGEST: NONE\nREF: example.org/worker:v2 -> REGISTRE: example.org | IMAGE: worker | TAG: v2 | DIGEST: NONE"
      },
      {
        "label": "Tag et digest associés ; port sans tag",
        "stdin": "busybox:stable@sha256:bb22\n127.0.0.1:5000/org/app",
        "expected": "REF: busybox:stable@sha256:bb22 -> REGISTRE: docker.io/library | IMAGE: busybox | TAG: stable | DIGEST: sha256:bb22\nREF: 127.0.0.1:5000/org/app -> REGISTRE: 127.0.0.1:5000 | IMAGE: org/app | TAG: latest | DIGEST: NONE"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  reference = $0\n  name = reference\n  digest = \"NONE\"\n  at = index(name, \"@\")\n  if (at) { digest = substr(name, at + 1); name = substr(name, 1, at - 1) }\n  count = split(name, segments, \"/\")\n  last = segments[count]\n  colon = index(last, \":\")\n  tag = \"latest\"\n  if (colon) {\n    tag = substr(last, colon + 1)\n    name = substr(name, 1, length(name) - length(last)) substr(last, 1, colon - 1)\n    count = split(name, segments, \"/\")\n  }\n  if (count == 1) registry = \"docker.io/library\"\n  else if (segments[1] ~ /[.:]/ || segments[1] == \"localhost\") {\n    registry = segments[1]\n    name = substr(name, length(registry) + 2)\n  } else registry = \"docker.io\"\n  printf \"REF: %s -> REGISTRE: %s | IMAGE: %s | TAG: %s | DIGEST: %s\\n\", reference, registry, name, tag, digest\n}\n'\n"
  },
  {
    "id": "dk2-c2-e3",
    "chapter": 2,
    "title": "Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Première ligne : chemins de l'image séparés par des virgules ; cette liste peut être vide.<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nDans ce modèle, CREATE vise un fichier absent et DELETE un fichier présent ; les autres cas ne sont pas définis.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s'il est dans l'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S'il est dans l'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S'il était dans l'image : <code>MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)</code><br>\n  * S'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>",
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
        "label": "Whiteout puis recréation",
        "stdin": "/base\nDELETE /base\nWRITE /base\nCREATE /base\nWRITE /base",
        "expected": "DELETE /base -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)\nWRITE /base -> ERREUR: Fichier introuvable pour modification\nCREATE /base -> MECANISME: Creation directe dans Container Layer\nWRITE /base -> MECANISME: Ecriture directe dans Container Layer"
      },
      {
        "label": "Création et suppression sans toucher à l’image",
        "stdin": "/only\nCREATE /fresh\nREAD /fresh\nDELETE /fresh\nREAD /fresh\nREAD /only",
        "expected": "CREATE /fresh -> MECANISME: Creation directe dans Container Layer\nREAD /fresh -> ACCES: Container Layer (Version modifiee)\nDELETE /fresh -> MECANISME: Suppression directe de Container Layer\nREAD /fresh -> ERREUR: Fichier introuvable (404 ENOENT)\nREAD /only -> ACCES: Image Layer (Lecture directe RO sans duplication)"
      },
      {
        "label": "Multiples écritures successives sur fichier existant",
        "stdin": "/app/settings.json\nWRITE /app/settings.json\nWRITE /app/settings.json",
        "expected": "WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
      },
      {
        "label": "Erreurs de lecture et écriture sur fichier inexistant",
        "stdin": "/etc/hosts\nREAD /etc/inexistant\nWRITE /etc/inexistant",
        "expected": "READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification"
      },
      {
        "label": "Création d’un nouveau fichier puis écriture et suppression",
        "stdin": "/bin/sh\nCREATE /tmp/test.txt\nWRITE /tmp/test.txt\nDELETE /tmp/test.txt\nREAD /tmp/test.txt",
        "expected": "CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNR == 1 {\n  count = split($0, files, \",\")\n  for (index_file = 1; index_file <= count; index_file++) {\n    file = trim(files[index_file])\n    if (file != \"\") image[file] = 1\n  }\n  next\n}\nNF >= 2 {\n  action = $1\n  file = $2\n  if (action == \"READ\") {\n    if (active[file]) result = \"ACCES: Container Layer (Version modifiee)\"\n    else if (image[file] && !deleted[file]) result = \"ACCES: Image Layer (Lecture directe RO sans duplication)\"\n    else result = \"ERREUR: Fichier introuvable (404 ENOENT)\"\n  } else if (action == \"WRITE\") {\n    if (active[file]) result = \"MECANISME: Ecriture directe dans Container Layer\"\n    else if (image[file] && !deleted[file]) {\n      result = \"MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\"\n      active[file] = 1\n    } else result = \"ERREUR: Fichier introuvable pour modification\"\n  } else if (action == \"CREATE\") {\n    active[file] = 1\n    deleted[file] = 0\n    result = \"MECANISME: Creation directe dans Container Layer\"\n  } else if (action == \"DELETE\" && (active[file] || (image[file] && !deleted[file]))) {\n    if (image[file]) {\n      result = \"MECANISME: Whiteout (Creation d\\047un fichier masque dans Container Layer sans toucher a l\\047image RO)\"\n      deleted[file] = 1\n    } else result = \"MECANISME: Suppression directe de Container Layer\"\n    delete active[file]\n  } else next\n  printf \"%s %s -> %s\\n\", action, file, result\n}\n'\n"
  },
  {
    "id": "dk2-c3-e1",
    "chapter": 3,
    "title": "Validateur et linter de bonnes pratiques Dockerfile",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nL'audit est textuel et limité aux instructions en forme texte ; il ne valide pas toute la syntaxe Dockerfile ou shell. Une instruction peut se poursuivre sur plusieurs lignes avec <code>\\</code> ; son numéro est celui de sa première ligne.<br>\nRègles d'audit et de conformité :<br>\n1. Première instruction non vide et non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>), et une instruction <code>FROM</code> doit être présente. Sinon : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, afficher <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>",
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
        "label": "ARG initial et commande apt chaînée sur plusieurs lignes",
        "stdin": "# base\nARG VERSION=stable\nFROM debian:bookworm\nRUN apt-get update && \\\n    apt-get install -y curl\nADD bundle.tar.gz /opt/",
        "expected": "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
      },
      {
        "label": "Plusieurs avertissements et archive distante",
        "stdin": "FROM alpine\nADD config.ini /etc/\nRUN apt-get update\nADD https://example.org/a.zip /tmp/\nADD script.py /opt/",
        "expected": "AVERTISSEMENT [Ligne 2]: Preferer COPY a ADD pour les fichiers locaux\nAVERTISSEMENT [Ligne 3]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAVERTISSEMENT [Ligne 5]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (3 avertissement(s))"
      },
      {
        "label": "Erreur critique absence de FROM initial",
        "stdin": "WORKDIR /app\nCOPY . .\nCMD [\"sh\"]",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      },
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
        "label": "ARG sans FROM",
        "stdin": "ARG VERSION=1",
        "expected": "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nfunction inspect(instruction, number,    fields, count, command, body, index_field, local_file) {\n  instruction = trim(instruction)\n  count = split(instruction, fields, /[[:space:]]+/)\n  command = toupper(fields[1])\n  if (!first_seen) {\n    first_seen = 1\n    if (command != \"FROM\" && command != \"ARG\") invalid = 1\n  }\n  if (command == \"FROM\") from_seen = 1\n  if (command == \"ADD\") {\n    local_file = 0\n    for (index_field = 2; index_field < count; index_field++) {\n      if (fields[index_field] ~ /^--/) continue\n      if (fields[index_field] !~ /^https?:\\/\\// && tolower(fields[index_field]) !~ /\\.(tar|gz|zip)$/) local_file = 1\n    }\n    if (local_file) warnings[++warning_count] = sprintf(\"AVERTISSEMENT [Ligne %d]: Preferer COPY a ADD pour les fichiers locaux\", number)\n  }\n  if (command == \"RUN\") {\n    body = substr(instruction, length(fields[1]) + 1)\n    if (body ~ /apt-get[[:space:]]+update/ && body !~ /apt-get[[:space:]]+install/)\n      warnings[++warning_count] = sprintf(\"AVERTISSEMENT [Ligne %d]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\", number)\n  }\n}\n{\n  line = trim($0)\n  if (line == \"\" || line ~ /^#/) next\n  if (pending == \"\") start = NR\n  continued = sub(/\\\\[[:space:]]*$/, \"\", line)\n  pending = pending line \" \"\n  if (!continued) { inspect(pending, start); pending = \"\" }\n}\nEND {\n  if (pending != \"\") inspect(pending, start)\n  if (!first_seen || !from_seen || invalid) print \"ERREUR_CRITIQUE: Dockerfile doit debuter par FROM\"\n  else if (!warning_count) print \"AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)\"\n  else {\n    for (index_warning = 1; index_warning <= warning_count; index_warning++) print warnings[index_warning]\n    printf \"AUDIT_DOCKERFILE: NON_CONFORME (%d avertissement(s))\\n\", warning_count\n  }\n}\n'\n"
  },
  {
    "id": "dk2-c3-e2",
    "chapter": 3,
    "title": "Distributeur de commandes CMD vs ENTRYPOINT",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.",
    "brief": "<p>Le script Bash lit trois lignes sur l’entrée standard (stdin) :<br>\n1. <code>ENTRYPOINT: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s'il existe) sinon <code>CMD</code>.<br>\nCe modèle représente les listes de type exec, pas la forme shell de Dockerfile. Si les trois listes valent <code>NONE</code>, afficher <code>COMMANDE_FINALE:</code> sans commande ; ce résultat ne garantit pas qu'un conteneur puisse démarrer.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>",
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
        "label": "Arguments CLI ajoutés à ENTRYPOINT à la place de CMD",
        "stdin": "ENTRYPOINT: /entry, --verbose\nCMD: default\nCLI_ARGS: --help",
        "expected": "COMMANDE_FINALE: /entry --verbose --help"
      },
      {
        "label": "Trois listes vides",
        "stdin": "ENTRYPOINT: NONE\nCMD: NONE\nCLI_ARGS: NONE",
        "expected": "COMMANDE_FINALE:"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nfunction arguments(value,    count, parts, index_part, joined) {\n  value = trim(value)\n  if (value == \"NONE\") return \"\"\n  count = split(value, parts, \",\")\n  for (index_part = 1; index_part <= count; index_part++) {\n    if (index_part > 1) joined = joined \" \"\n    joined = joined trim(parts[index_part])\n  }\n  return joined\n}\n{\n  colon = index($0, \":\")\n  if (colon) values[trim(substr($0, 1, colon - 1))] = arguments(substr($0, colon + 1))\n}\nEND {\n  suffix = values[\"CLI_ARGS\"] != \"\" ? values[\"CLI_ARGS\"] : values[\"CMD\"]\n  result = values[\"ENTRYPOINT\"]\n  if (result != \"\" && suffix != \"\") result = result \" \" suffix\n  else if (result == \"\") result = suffix\n  printf \"COMMANDE_FINALE:\"\n  if (result != \"\") printf \" %s\", result\n  printf \"\\n\"\n}\n'\n"
  },
  {
    "id": "dk2-c3-e3",
    "chapter": 3,
    "title": "Optimiseur de cache et build Multi-Stage",
    "level": "n3",
    "language": "shell",
    "goal": "Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.",
    "brief": "<p>Le script Bash lit trois lignes sur l’entrée standard (stdin).<br>\n- Ligne 1 : <code>MONOLITHIC: &lt;NomBase&gt; &lt;TailleBaseMo&gt; + &lt;OutilsDevMo&gt; + &lt;CodeMo&gt; + &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nLes tailles sont des entiers positifs ou nuls ; la taille monolithique est strictement positive et la taille finale ne la dépasse pas. Les tailles d'export et d'import du binaire sont identiques.<br>\nCalculer :<br>\n1. Taille totale de l'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>",
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
        "label": "Aucune économie",
        "stdin": "MONOLITHIC: base 1 + 0 + 0 + 0\nSTAGE_BUILD: base 1 -> EXPORT: 0\nSTAGE_FINAL: same 1 + IMPORT: 0",
        "expected": "IMAGE_MONOLITHIQUE: 1 Mo\nIMAGE_MULTI_STAGE: 1 Mo\nGAIN_SECURITE_ET_TAILLE: -0 Mo (0.0% economises)"
      },
      {
        "label": "Image finale vide dans le modèle",
        "stdin": "MONOLITHIC: builder 10 + 0 + 0 + 0\nSTAGE_BUILD: builder 10 -> EXPORT: 0\nSTAGE_FINAL: scratch 0 + IMPORT: 0",
        "expected": "IMAGE_MONOLITHIQUE: 10 Mo\nIMAGE_MULTI_STAGE: 0 Mo\nGAIN_SECURITE_ET_TAILLE: -10 Mo (100.0% economises)"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nNR == 1 {\n  line = $0\n  sub(/^[^:]*:[[:space:]]*/, \"\", line)\n  count = split(line, fields, /[[:space:]]+/)\n  for (index_field = 2; index_field <= count; index_field++) if (fields[index_field] != \"+\") monolithic += fields[index_field] + 0\n}\nNR == 3 {\n  line = $0\n  sub(/^[^:]*:[[:space:]]*/, \"\", line)\n  split(line, fields, /[[:space:]]+/)\n  final_size = fields[2] + fields[5]\n}\nEND {\n  reduction = monolithic - final_size\n  printf \"IMAGE_MONOLITHIQUE: %.0f Mo\\n\", monolithic\n  printf \"IMAGE_MULTI_STAGE: %.0f Mo\\n\", final_size\n  printf \"GAIN_SECURITE_ET_TAILLE: -%.0f Mo (%.1f%% economises)\\n\", reduction, 100 * reduction / monolithic\n}\n'\n"
  },
  {
    "id": "dk2-c4-e1",
    "chapter": 4,
    "title": "Gestionnaire d’états du cycle de vie d’un conteneur",
    "level": "n1",
    "language": "shell",
    "goal": "Simuler la machine à états finis du cycle de vie d’un conteneur Docker et valider les transitions de commandes.",
    "brief": "<p>Le script Bash lit une commande par ligne sur l’entrée standard (stdin). L’état initial est <code>ABSENT</code>. Une action invalide ne change pas cet état.<br>\nÉtats possibles : <code>ABSENT</code>, <code>CREATED</code>, <code>RUNNING</code>, <code>PAUSED</code>, <code>STOPPED</code>.<br>\nRègles de transition :<br>\n- Depuis <code>ABSENT</code> : <code>create</code> -&gt; <code>CREATED</code>, <code>run</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>CREATED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Depuis <code>RUNNING</code> : <code>pause</code> -&gt; <code>PAUSED</code>, <code>stop</code> -&gt; <code>STOPPED</code>, <code>restart</code> -&gt; <code>RUNNING</code>, <code>kill</code> -&gt; <code>STOPPED</code>.<br>\n- Depuis <code>PAUSED</code> : <code>unpause</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>STOPPED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Si une commande <code>rm</code> est tentée sur <code>RUNNING</code> ou <code>PAUSED</code> sans option force : afficher <code>TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: &lt;ETAT&gt;)</code>.<br>\n- Pour toute autre action invalide : afficher <code>TRANSITION_INVALIDE: Action &lt;cmd&gt; impossible depuis l'etat &lt;ETAT&gt;</code>.<br>\n- Si la transition est valide, afficher :<br>\n<code>&lt;CMD&gt; -&gt; NOUVEL_ETAT: &lt;NOUVEL_ETAT&gt;</code></p>",
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
        "label": "Unpause restaure RUNNING et rm reste interdit",
        "stdin": "run\npause\nunpause\nstop\nstart\nrm\npause\nunpause\nrm",
        "expected": "run -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nunpause -> NOUVEL_ETAT: RUNNING\nstop -> NOUVEL_ETAT: STOPPED\nstart -> NOUVEL_ETAT: RUNNING\nTRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: RUNNING)\npause -> NOUVEL_ETAT: PAUSED\nunpause -> NOUVEL_ETAT: RUNNING\nTRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: RUNNING)"
      },
      {
        "label": "Commandes invalides et suppression avant démarrage",
        "stdin": "start\ncreate\nrun\nrm\ncreate\nstart\nrestart\nkill\nrm\nunpause",
        "expected": "TRANSITION_INVALIDE: Action start impossible depuis l'etat ABSENT\ncreate -> NOUVEL_ETAT: CREATED\nTRANSITION_INVALIDE: Action run impossible depuis l'etat CREATED\nrm -> NOUVEL_ETAT: ABSENT\ncreate -> NOUVEL_ETAT: CREATED\nstart -> NOUVEL_ETAT: RUNNING\nrestart -> NOUVEL_ETAT: RUNNING\nkill -> NOUVEL_ETAT: STOPPED\nrm -> NOUVEL_ETAT: ABSENT\nTRANSITION_INVALIDE: Action unpause impossible depuis l'etat ABSENT"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  state = \"ABSENT\"\n  transition[\"ABSENT\", \"create\"] = \"CREATED\"\n  transition[\"ABSENT\", \"run\"] = \"RUNNING\"\n  transition[\"CREATED\", \"start\"] = \"RUNNING\"\n  transition[\"CREATED\", \"rm\"] = \"ABSENT\"\n  transition[\"RUNNING\", \"pause\"] = \"PAUSED\"\n  transition[\"RUNNING\", \"stop\"] = \"STOPPED\"\n  transition[\"RUNNING\", \"restart\"] = \"RUNNING\"\n  transition[\"RUNNING\", \"kill\"] = \"STOPPED\"\n  transition[\"PAUSED\", \"unpause\"] = \"RUNNING\"\n  transition[\"STOPPED\", \"start\"] = \"RUNNING\"\n  transition[\"STOPPED\", \"rm\"] = \"ABSENT\"\n}\nNF {\n  command = $0\n  if (command == \"rm\" && (state == \"RUNNING\" || state == \"PAUSED\"))\n    printf \"TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: %s)\\n\", state\n  else if ((state, command) in transition) {\n    state = transition[state, command]\n    printf \"%s -> NOUVEL_ETAT: %s\\n\", command, state\n  } else printf \"TRANSITION_INVALIDE: Action %s impossible depuis l\\047etat %s\\n\", command, state\n}\n'\n"
  },
  {
    "id": "dk2-c4-e2",
    "chapter": 4,
    "title": "Simulateur de redirection de ports (Port Mapping NAT) et conflits",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la table de translation d’adresses NAT et détecter les collisions de ports hôte.",
    "brief": "<p>Le script Bash lit une publication par ligne sur l’entrée standard (stdin), au format <code>&lt;conteneur&gt; &lt;publication&gt;</code>. Les adresses sont IPv4 et les ports sont compris entre 1 et 65535.<br>\nFormats de publication :<br>\n- <code>HotePort:ConteneurPort</code> -&gt; IP par défaut <code>0.0.0.0</code>.<br>\n- <code>IP:HotePort:ConteneurPort</code>.<br>\nRègles de validation :<br>\n- Une paire (<code>IP_Hote</code>, <code>HotePort</code>) ne peut être allouée qu'à un seul conteneur. (L'IP <code>0.0.0.0</code> entre en conflit avec n'importe quelle IP spécifique sur le même port).<br>\n- Si le port est libre : enregistrer la règle et afficher :<br>\n  <code>PUBLICATION: &lt;Conteneur&gt; -&gt; NAT: &lt;IP&gt;:&lt;HotePort&gt; =&gt; &lt;ConteneurPort&gt;/tcp (SUCCES)</code><br>\n- S'il y a conflit de port sur l'hôte : indiquer la première réservation conflictuelle dans l'ordre d'entrée, puis afficher :<br>\n  <code>CONFLIT_PORT: &lt;Conteneur&gt; -&gt; Port hote &lt;HotePort&gt; deja reserve par &lt;ConteneurPrecedent&gt; (ECHEC)</code></p>",
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
        "label": "Adresse générique demandée après une adresse précise",
        "stdin": "first 127.0.0.1:8100:80\nsecond 8100:81\nthird 192.0.2.2:8100:82",
        "expected": "PUBLICATION: first -> NAT: 127.0.0.1:8100 => 80/tcp (SUCCES)\nCONFLIT_PORT: second -> Port hote 8100 deja reserve par first (ECHEC)\nPUBLICATION: third -> NAT: 192.0.2.2:8100 => 82/tcp (SUCCES)"
      },
      {
        "label": "Bornes de ports et conflit générique",
        "stdin": "a 127.0.0.1:1:65535\nb 65535:1\nc 192.0.2.8:1:443\nd 1:99",
        "expected": "PUBLICATION: a -> NAT: 127.0.0.1:1 => 65535/tcp (SUCCES)\nPUBLICATION: b -> NAT: 0.0.0.0:65535 => 1/tcp (SUCCES)\nPUBLICATION: c -> NAT: 192.0.2.8:1 => 443/tcp (SUCCES)\nCONFLIT_PORT: d -> Port hote 1 deja reserve par a (ECHEC)"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF >= 2 {\n  container = $1\n  count = split($2, parts, \":\")\n  if (count == 2) { address = \"0.0.0.0\"; host_port = parts[1]; container_port = parts[2] }\n  else { address = parts[1]; host_port = parts[2]; container_port = parts[3] }\n  conflict = 0\n  for (index_rule = 1; index_rule <= allocated; index_rule++) {\n    if (ports[index_rule] + 0 == host_port + 0 && (addresses[index_rule] == address || addresses[index_rule] == \"0.0.0.0\" || address == \"0.0.0.0\")) {\n      conflict = index_rule\n      break\n    }\n  }\n  if (conflict) printf \"CONFLIT_PORT: %s -> Port hote %s deja reserve par %s (ECHEC)\\n\", container, host_port, owners[conflict]\n  else {\n    allocated++\n    addresses[allocated] = address\n    ports[allocated] = host_port\n    owners[allocated] = container\n    printf \"PUBLICATION: %s -> NAT: %s:%s => %s/tcp (SUCCES)\\n\", container, address, host_port, container_port\n  }\n}\n'\n"
  },
  {
    "id": "dk2-c4-e3",
    "chapter": 4,
    "title": "Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs",
    "level": "n3",
    "language": "shell",
    "goal": "Qualifier la nature, la persistance et les droits d’accès des options de stockage Docker (-v, --mount, --tmpfs).",
    "brief": "<p>Le script Bash lit un montage par ligne sur l’entrée standard (stdin). Ce modèle traite <code>-v</code>, <code>--tmpfs</code> et les formes <code>--mount</code> décrites ci-dessous ; il suppose un daemon Linux local et ne détermine pas les réglages réels d'un plugin de volume. Le libellé du tmpfs est simplifié : son contenu peut aussi être écrit dans le swap de l'hôte. Le chemin des volumes indiqué est un exemple de configuration par défaut.<br>\nRègles d'analyse :<br>\n1. <code>--tmpfs &lt;cible&gt;</code> :<br>\n   - Type : <code>TMPFS</code><br>\n   - Localisation : <code>Memoire vive RAM de l'hote</code><br>\n   - Persistance : <code>VOLATILE (detruit a l'arret du conteneur)</code><br>\n   - Droits : <code>LECTURE_ECRITURE</code><br>\n2. <code>-v &lt;source&gt;:&lt;cible&gt;[:&lt;opt&gt;]</code> :<br>\n   - Si source commence par <code>/</code>, <code>./</code> ou <code>../</code> : Type <code>BIND_MOUNT</code>, Localisation <code>Repertoire specifique de la machine hote</code>.<br>\n   - Sinon : Type <code>VOLUME_NOMME</code>, Localisation <code>Espace reserve du daemon (/var/lib/docker/volumes/)</code>.<br>\n   - Persistance : <code>PERSISTANT (survit a docker rm)</code>.<br>\n   - Droits : <code>LECTURE_SEULE</code> si <code>ro</code> est spécifié, seul ou parmi des options séparées par des virgules, sinon <code>LECTURE_ECRITURE</code>.<br>\n3. <code>--mount type=bind,source=&lt;chemin&gt;,target=&lt;cible&gt;[,readonly]</code> et <code>--mount type=volume,source=&lt;nom&gt;,target=&lt;cible&gt;[,readonly]</code> suivent respectivement les règles du bind mount et du volume nommé ; <code>--mount type=tmpfs,target=&lt;cible&gt;</code> suit celles du tmpfs. L'ordre des champs n'est pas imposé.<br>\nAfficher :<br>\n<code>STOCKAGE: &lt;entree&gt; -&gt; TYPE: &lt;TYPE&gt; | &lt;LOCALISATION&gt; | &lt;PERSISTANCE&gt; | &lt;DROITS&gt;</code></p>",
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
        "label": "Chemin relatif et volume nommés en lecture seule",
        "stdin": "-v ../data:/data:ro\n-v backups:/backup:ro\n-v ./src:/src\n-v shared:/share:ro,z",
        "expected": "STOCKAGE: -v ../data:/data:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE\nSTOCKAGE: -v backups:/backup:ro -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_SEULE\nSTOCKAGE: -v ./src:/src -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE\nSTOCKAGE: -v shared:/share:ro,z -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_SEULE"
      },
      {
        "label": "Montages explicites volume, tmpfs et bind",
        "stdin": "--mount type=volume,source=data,target=/var,readonly\n--mount type=tmpfs,target=/tmp\n--mount type=bind,source=/host,target=/app",
        "expected": "STOCKAGE: --mount type=volume,source=data,target=/var,readonly -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_SEULE\nSTOCKAGE: --mount type=tmpfs,target=/tmp -> TYPE: TMPFS | Memoire vive RAM de l'hote | VOLATILE (detruit a l'arret du conteneur) | LECTURE_ECRITURE\nSTOCKAGE: --mount type=bind,source=/host,target=/app -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE"
      },
      {
        "label": "Stockage éphémère tmpfs pour sécurité",
        "stdin": "--tmpfs /run/secrets",
        "expected": "STOCKAGE: --tmpfs /run/secrets -> TYPE: TMPFS | Memoire vive RAM de l'hote | VOLATILE (detruit a l'arret du conteneur) | LECTURE_ECRITURE"
      },
      {
        "label": "Volume nommé avec droit par défaut rw",
        "stdin": "-v redis_persist:/data",
        "expected": "STOCKAGE: -v redis_persist:/data -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE"
      },
      {
        "label": "Bind mount en lecture seule",
        "stdin": "-v /var/log/app:/app/logs:ro",
        "expected": "STOCKAGE: -v /var/log/app:/app/logs:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  input = $0\n  type = \"\"\n  readonly = 0\n  if ($1 == \"--tmpfs\") type = \"TMPFS\"\n  else if ($1 == \"-v\") {\n    split($2, fields, \":\")\n    source = fields[1]\n    type = source ~ /^(\\/|\\.\\/|\\.\\.\\/)/ ? \"BIND_MOUNT\" : \"VOLUME_NOMME\"\n    option_count = split(fields[3], options, \",\")\n    for (index_option = 1; index_option <= option_count; index_option++) if (options[index_option] == \"ro\") readonly = 1\n  } else if ($1 == \"--mount\") {\n    values = substr($0, index($0, \" \") + 1)\n    count = split(values, fields, \",\")\n    for (index_field = 1; index_field <= count; index_field++) {\n      split(fields[index_field], pair, \"=\")\n      if (pair[1] == \"type\") mount_type = pair[2]\n      if (pair[1] == \"readonly\" && (pair[2] == \"\" || pair[2] == \"true\")) readonly = 1\n    }\n    if (mount_type == \"bind\") type = \"BIND_MOUNT\"\n    else if (mount_type == \"volume\") type = \"VOLUME_NOMME\"\n    else if (mount_type == \"tmpfs\") type = \"TMPFS\"\n  }\n  if (type == \"TMPFS\") {\n    location = \"Memoire vive RAM de l\\047hote\"\n    persistence = \"VOLATILE (detruit a l\\047arret du conteneur)\"\n  } else if (type == \"BIND_MOUNT\") {\n    location = \"Repertoire specifique de la machine hote\"\n    persistence = \"PERSISTANT (survit a docker rm)\"\n  } else if (type == \"VOLUME_NOMME\") {\n    location = \"Espace reserve du daemon (/var/lib/docker/volumes/)\"\n    persistence = \"PERSISTANT (survit a docker rm)\"\n  } else next\n  rights = readonly ? \"LECTURE_SEULE\" : \"LECTURE_ECRITURE\"\n  printf \"STOCKAGE: %s -> TYPE: %s | %s | %s | %s\\n\", input, type, location, persistence, rights\n}\n'\n"
  },
  {
    "id": "dk2-c5-e1",
    "chapter": 5,
    "title": "Parseur et validateur de services Docker Compose",
    "level": "n1",
    "language": "shell",
    "goal": "Valider la structure des déclarations de services dans une spécification Docker Compose.",
    "brief": "<p>Le script Bash lit un service par ligne sur l’entrée standard (stdin), au format <code>service: nom | image: valeur | ports: valeur | restart: valeur</code> ; <code>build</code> peut remplacer ou accompagner <code>image</code>. Les champs facultatifs peuvent être omis ou réordonnés.<br>\nCe format et les règles suivantes sont ceux d'un modèle d'exercice, pas un validateur complet de Compose : une valeur <code>restart</code> inconnue est ramenée à <code>no</code> par convention. Une valeur vide ne compte pas comme image ou build ; si les deux sont renseignés, afficher l'image comme origine.<br>\nRègles de validation :<br>\n1. Chaque service DOIT comporter au moins une directive <code>image</code> OU <code>build</code>.<br>\n2. La directive <code>restart</code>, si présente, doit être parmi : <code>no</code>, <code>always</code>, <code>unless-stopped</code>, <code>on-failure</code>. (Sinon <code>no</code> par défaut).<br>\nPour chaque service :<br>\n- Si valide : <code>SERVICE: &lt;Nom&gt; -&gt; VALIDE [Origine: &lt;ImageOuBuild&gt; | Ports: &lt;PortsOuAucun&gt; | Restart: &lt;Restart&gt;]</code><br>\n- Si ni image ni build n'est défini : <code>SERVICE: &lt;Nom&gt; -&gt; INVALIDE (Directive image ou build obligatoire)</code></p>",
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
        "label": "Image et build ensemble, ports et restart",
        "stdin": "service: worker | build: ../svc | image: org/worker:v2 | restart: on-failure | ports: 9000:80",
        "expected": "SERVICE: worker -> VALIDE [Origine: image:org/worker:v2 | Ports: 9000:80 | Restart: on-failure]"
      },
      {
        "label": "Origine vide et build valide avec champs réordonnés",
        "stdin": "service: empty | image: | restart: always\nrestart: always | build: . | service: job\nservice: queue | image: rabbitmq:3 | restart: unless-stopped",
        "expected": "SERVICE: empty -> INVALIDE (Directive image ou build obligatoire)\nSERVICE: job -> VALIDE [Origine: build:. | Ports: aucun | Restart: always]\nSERVICE: queue -> VALIDE [Origine: image:rabbitmq:3 | Ports: aucun | Restart: unless-stopped]"
      },
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
      },
      {
        "label": "Restart unless-stopped conservé",
        "stdin": "service: queue | image: rabbitmq:3 | restart: unless-stopped",
        "expected": "SERVICE: queue -> VALIDE [Origine: image:rabbitmq:3 | Ports: aucun | Restart: unless-stopped]"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  delete values\n  count = split($0, fields, \"|\")\n  for (index_field = 1; index_field <= count; index_field++) {\n    colon = index(fields[index_field], \":\")\n    if (colon) values[trim(substr(fields[index_field], 1, colon - 1))] = trim(substr(fields[index_field], colon + 1))\n  }\n  name = values[\"service\"]\n  if (values[\"image\"] != \"\") origin = \"image:\" values[\"image\"]\n  else if (values[\"build\"] != \"\") origin = \"build:\" values[\"build\"]\n  else { printf \"SERVICE: %s -> INVALIDE (Directive image ou build obligatoire)\\n\", name; next }\n  ports = values[\"ports\"] != \"\" ? values[\"ports\"] : \"aucun\"\n  restart = values[\"restart\"]\n  if (restart != \"no\" && restart != \"always\" && restart != \"unless-stopped\" && restart != \"on-failure\") restart = \"no\"\n  printf \"SERVICE: %s -> VALIDE [Origine: %s | Ports: %s | Restart: %s]\\n\", name, origin, ports, restart\n}\n'\n"
  },
  {
    "id": "dk2-c5-e2",
    "chapter": 5,
    "title": "Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer l’ordre d’instanciation séquentiel des conteneurs via un tri topologique sans cycle.",
    "brief": "<p>Le script Bash lit une ligne par service sur l’entrée standard (stdin), au format <code>&lt;service&gt; -&gt; &lt;dépendance1, dépendance2, ... ou NONE&gt;</code>. Une dépendance mentionnée est aussi un service, même sans ligne propre.<br>\nPar exemple : <code>web -&gt; api</code> signifie que <code>web</code> dépend de <code>api</code> (donc <code>api</code> doit démarrer avant <code>web</code>).<br>\nRègles :<br>\n- Effectuer un tri topologique des services.<br>\n- À chaque étape, parmi les services dont toutes les dépendances sont déjà démarrées, choisir le premier par ordre alphabétique. Une dépendance répétée ne compte qu'une fois.<br>\n- Si une boucle de dépendance, y compris sur un service lui-même, est détectée, afficher : <code>ERREUR_COMPOSE: Dependance cyclique detectee</code>.<br>\n- Sinon, afficher l'ordre de ce modèle séquentiel :<br>\n<code>ORDRE_DEMARRAGE: &lt;S1&gt; -&gt; &lt;S2&gt; -&gt; ...</code><br>Une entrée sans service donne <code>ORDRE_DEMARRAGE:</code>. Cet ordre ne garantit pas que les applications soient prêtes à recevoir des requêtes.</p>",
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
        "label": "Priorité alphabétique réévaluée et dépendance répétée",
        "stdin": "front -> api, api\napi -> db\ndb -> NONE\nzeta -> NONE",
        "expected": "ORDRE_DEMARRAGE: db -> api -> front -> zeta"
      },
      {
        "label": "Cycle partiel malgré un service indépendant",
        "stdin": "ready -> NONE\na -> b\nb -> a",
        "expected": "ERREUR_COMPOSE: Dependance cyclique detectee"
      },
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
      },
      {
        "label": "Aucun service",
        "stdin": "",
        "expected": "ORDRE_DEMARRAGE:"
      }
    ],
    "solution": "#!/usr/bin/env bash\nLC_ALL=C awk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  arrow = index($0, \"->\")\n  service = trim(substr($0, 1, arrow - 1))\n  dependencies = trim(substr($0, arrow + 2))\n  services[service] = 1\n  if (dependencies != \"NONE\" && dependencies != \"\") {\n    count = split(dependencies, parts, \",\")\n    for (index_part = 1; index_part <= count; index_part++) {\n      dependency = trim(parts[index_part])\n      services[dependency] = 1\n      if (!((service, dependency) in edge)) { edge[service, dependency] = 1; degree[service]++ }\n    }\n  }\n}\nEND {\n  for (service in services) total++\n  for (completed = 0; completed < total; completed++) {\n    choice = \"\"\n    for (service in services)\n      if (!done[service] && degree[service] == 0 && (choice == \"\" || service < choice)) choice = service\n    if (choice == \"\") { print \"ERREUR_COMPOSE: Dependance cyclique detectee\"; exit }\n    done[choice] = 1\n    order = order (order == \"\" ? \"\" : \" -> \") choice\n    for (service in services) if ((service, choice) in edge) degree[service]--\n  }\n  printf \"ORDRE_DEMARRAGE:\"\n  if (order != \"\") printf \" %s\", order\n  printf \"\\n\"\n}\n'\n"
  },
  {
    "id": "dk2-c5-e3",
    "chapter": 5,
    "title": "Interprète de variables d’environnement et fichiers .env dans Compose",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre les syntaxes d’interpolation `${VAR}` et `${VAR:-default}` dans les fichiers de configuration Compose.",
    "brief": "<p>Le script Bash lit deux blocs sur l’entrée standard (stdin).<br>\n- Bloc 1 : une affectation simple <code>NOM=valeur</code> par ligne, représentant les valeurs d'un fichier <code>.env</code>.<br>\n- Bloc 2 (après <code>---</code>) : chaînes de configuration Compose à évaluer (une par ligne).<br>\nCe modèle utilise uniquement le premier bloc ; il ne reproduit pas les priorités entre environnement du shell et fichiers Compose. Les noms suivent le format <code>[A-Za-z_][A-Za-z0-9_]*</code>, les valeurs sont du texte littéral, et les interpolations imbriquées ou échappées ne sont pas traitées.<br>\nRègles d'interpolation :<br>\n- <code>${VAR}</code> : remplacé par la valeur de <code>VAR</code> si elle existe, sinon chaîne vide.<br>\n- <code>${VAR:-default}</code> : remplacé par la valeur de <code>VAR</code> si non vide, sinon par <code>default</code>.<br>\nPour chaque chaîne du bloc 2, afficher :<br>\n<code>RESOLU: &lt;ChaineApresInterpolation&gt;</code></p>",
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
        "label": "Variable vide, valeur zéro et valeur absente",
        "stdin": "EMPTY=\nZERO=0\n---\na:${EMPTY:-fallback}\nb:${EMPTY}\nc:${ZERO:-fallback}\nd:${MISS:-}",
        "expected": "RESOLU: a:fallback\nRESOLU: b:\nRESOLU: c:0\nRESOLU: d:"
      },
      {
        "label": "Valeur avec signe égal et interpolations répétées",
        "stdin": "VALUE=one=two\nL=left\n---\n${L}-${VALUE}-${MISS:-right}\n${VALUE}/${VALUE}",
        "expected": "RESOLU: left-one=two-right\nRESOLU: one=two/one=two"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\n$0 == \"---\" && !configuration { configuration = 1; next }\n!configuration {\n  equals = index($0, \"=\")\n  if (equals) values[substr($0, 1, equals - 1)] = substr($0, equals + 1)\n  next\n}\n{\n  remaining = $0\n  result = \"\"\n  while (match(remaining, /\\$\\{[A-Za-z_][A-Za-z0-9_]*(:-[^}]*)?\\}/)) {\n    result = result substr(remaining, 1, RSTART - 1)\n    token = substr(remaining, RSTART + 2, RLENGTH - 3)\n    split_at = index(token, \":-\")\n    if (split_at) {\n      name = substr(token, 1, split_at - 1)\n      fallback = substr(token, split_at + 2)\n      replacement = values[name] != \"\" ? values[name] : fallback\n    } else replacement = values[token]\n    result = result replacement\n    remaining = substr(remaining, RSTART + RLENGTH)\n  }\n  printf \"RESOLU: %s%s\\n\", result, remaining\n}\n'\n"
  },
  {
    "id": "dk2-c6-e1",
    "chapter": 6,
    "title": "Auditeur de privilèges root et directive USER",
    "level": "n1",
    "language": "shell",
    "goal": "Vérifier la conformité de sécurité d’une image Docker en s’assurant qu’elle ne s’exécute pas sous le superutilisateur root.",
    "brief": "<p>Le script Bash lit un Dockerfile mono-étape sur l’entrée standard (stdin). Le modèle suppose une image de base dont l'utilisateur est root et vérifie seulement le nom ou l'UID indiqué par <code>USER</code>. Il ne résout pas les noms en UID et ne vérifie pas une option <code>--user</code> au lancement : <code>CONFORME</code> ne signifie pas que toute la sécurité du conteneur a été auditée.<br>\nRègles de ce contrôle :<br>\n- Par défaut dans Docker, l'utilisateur actif est <code>root</code> (UID 0).<br>\n- Si une instruction <code>USER &lt;nom_ou_uid&gt;[:groupe]</code> est rencontrée, elle modifie l'utilisateur actif pour les étapes suivantes et le runtime final.<br>\n- À la fin du fichier :<br>\n  * Si la partie utilisateur de la dernière directive est <code>root</code> ou <code>0</code> ou si aucune directive USER n'a été définie :<br>\n    afficher <code>AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)</code><br>\n  * Si le dernier utilisateur actif est non-root (ex: <code>node</code>, <code>appuser</code>, <code>1001</code>) :<br>\n    afficher <code>AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: &lt;USER&gt;)</code></p>",
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
        "label": "Absence de USER hors commentaires",
        "stdin": "FROM alpine\n# USER worker\nRUN echo USER worker",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Dernier utilisateur et groupe explicites",
        "stdin": "FROM alpine\nUSER root:123\nUSER 2001:100",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 2001:100)"
      },
      {
        "label": "UID 0 explicite",
        "stdin": "FROM debian\nUSER 0",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Retour explicite à root en fin de fichier",
        "stdin": "FROM node:18\nUSER node\nRUN npm install\nUSER root\nCMD [\"node\", \"app.js\"]",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      },
      {
        "label": "Création puis passage à un UID numérique",
        "stdin": "FROM alpine:3.18\nRUN adduser -D -u 10001 customuser\nUSER 10001\nCMD [\"sh\"]",
        "expected": "AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 10001)"
      },
      {
        "label": "UID zéro avec groupe",
        "stdin": "FROM alpine\nuser 0:27",
        "expected": "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN { user = \"root\" }\n{\n  line = $0\n  sub(/^[[:space:]]+/, \"\", line)\n  if (line ~ /^#/ || line == \"\") next\n  count = split(line, fields, /[[:space:]]+/)\n  if (toupper(fields[1]) == \"USER\" && count >= 2) user = fields[2]\n}\nEND {\n  split(user, parts, \":\")\n  if (parts[1] == \"root\" || (parts[1] ~ /^[0-9]+$/ && parts[1] + 0 == 0))\n    print \"AUDIT_SECURITE: CRITIQUE (Le conteneur s\\047execute avec les privileges root - UID 0)\"\n  else printf \"AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: %s)\\n\", user\n}\n'\n"
  },
  {
    "id": "dk2-c6-e2",
    "chapter": 6,
    "title": "Calculateur de quotas cgroups (CPU & Mémoire)",
    "level": "n2",
    "language": "shell",
    "goal": "Convertir les paramètres de contrainte de ressources Docker en métriques de contrôle noyau cgroups.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nChaque ligne contient <code>MEM=&lt;taille&gt; SWAP=&lt;taille&gt; CPUS=&lt;nombre&gt;</code>, par exemple <code>MEM=512m SWAP=1g CPUS=1.5</code>. Les tailles sont des entiers positifs ou nuls et le nombre de cœurs est un décimal positif ou nul.<br>\nCe modèle arithmétique n'est pas un validateur des options Docker : notamment les valeurs zéro et un total SWAP inférieur à MEM peuvent avoir une autre signification ou être refusés par Docker.<br>\nUnités mémoire : <code>m</code> (Mo = 1024 Ko) ou <code>g</code> (Go = 1024 Mo).<br>\nRègles cgroups v2 :<br>\n- <code>RAM_MAX_MO</code> : valeur convertie en Mo entiers.<br>\n- Dans Docker, l'option <code>--memory-swap</code> représente la mémoire totale (RAM + SWAP cumulés).<br>\n  Le swap additionnel effectif est donc : <code>SWAP_EFFECTIF_MO = max(0, SWAP_TOTAL_MO - RAM_MAX_MO)</code>.<br>\n- Période CPU CFS standard = <code>100000</code> microsecondes.<br>\n  Le quota alloué par période est : <code>CPU_QUOTA_US = int(CPUS * 100000)</code>.<br>\nAfficher :<br>\n<code>CGROUPS: RAM: &lt;RAM_MAX_MO&gt; Mo | SWAP_ADDITIONNEL: &lt;SWAP_EFFECTIF_MO&gt; Mo | CPU_QUOTA: &lt;CPU_QUOTA_US&gt; us / 100000 us (&lt;CPUS&gt; cœurs)</code></p>",
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
        "label": "Différence négative ramenée à zéro dans le modèle",
        "stdin": "MEM=32m SWAP=31m CPUS=0.5",
        "expected": "CGROUPS: RAM: 32 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 50000 us / 100000 us (0.5 cœurs)"
      },
      {
        "label": "Unité minimale et troncature décimale",
        "stdin": "MEM=1m SWAP=2m CPUS=0.100009",
        "expected": "CGROUPS: RAM: 1 Mo | SWAP_ADDITIONNEL: 1 Mo | CPU_QUOTA: 10000 us / 100000 us (0.100009 cœurs)"
      },
      {
        "label": "Conteneur CPU pur sans swap",
        "stdin": "MEM=1g SWAP=1g CPUS=2.0",
        "expected": "CGROUPS: RAM: 1024 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 200000 us / 100000 us (2.0 cœurs)"
      },
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
        "label": "Valeurs nulles dans le modèle",
        "stdin": "MEM=0m SWAP=0m CPUS=0",
        "expected": "CGROUPS: RAM: 0 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 0 us / 100000 us (0 cœurs)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction memory_megabytes(value,    unit, amount) {\n  unit = substr(value, length(value), 1)\n  amount = substr(value, 1, length(value) - 1) + 0\n  return unit == \"g\" ? amount * 1024 : amount\n}\nfunction cpu_quota(value,    parts, whole, fraction) {\n  split(value, parts, \".\")\n  whole = parts[1] + 0\n  fraction = substr(parts[2] \"00000\", 1, 5) + 0\n  return whole * 100000 + fraction\n}\nNF {\n  delete values\n  for (index_field = 1; index_field <= NF; index_field++) {\n    equals = index($index_field, \"=\")\n    if (equals) values[substr($index_field, 1, equals - 1)] = substr($index_field, equals + 1)\n  }\n  ram = memory_megabytes(values[\"MEM\"])\n  swap = memory_megabytes(values[\"SWAP\"]) - ram\n  if (swap < 0) swap = 0\n  cpu = values[\"CPUS\"]\n  printf \"CGROUPS: RAM: %.0f Mo | SWAP_ADDITIONNEL: %.0f Mo | CPU_QUOTA: %.0f us / 100000 us (%s cœurs)\\n\", ram, swap, cpu_quota(cpu), cpu\n}\n'\n"
  },
  {
    "id": "dk2-c6-e3",
    "chapter": 6,
    "title": "Simulateur de politique de redémarrage (Restart Policy)",
    "level": "n3",
    "language": "shell",
    "goal": "Déterminer si le démon Docker redémarre ou non un conteneur arrêté selon sa politique et son code de sortie.",
    "brief": "<p>Le script Bash lit un événement par ligne sur l’entrée standard (stdin), au format <code>POLITIQUE=... EXIT_CODE=... MANUEL=OUI|NON</code>. Le code de sortie est un entier positif ou nul.<br>\nLe modèle calcule uniquement la décision immédiate après cet arrêt. Il ne simule ni le redémarrage du daemon ni la durée préalable d'exécution ; <code>ARRET_DEFINITIF</code> est le libellé du modèle, pas une garantie pour tous les événements futurs.<br>\nRègles du modèle :<br>\n1. Si <code>MANUEL=OUI</code> (ex: <code>docker stop</code> déclenché par l'admin) :<br>\n   - <code>DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)</code><br>\n2. Sinon :<br>\n   - <code>POLITIQUE=no</code> : <code>DECISION: ARRET_DEFINITIF (Politique \"no\")</code><br>\n   - <code>POLITIQUE=always</code> ou <code>POLITIQUE=unless-stopped</code> :<br>\n     <code>DECISION: REDEMARRER (Relance automatique du conteneur)</code><br>\n   - <code>POLITIQUE=on-failure</code> :<br>\n     * Si <code>EXIT_CODE == 0</code> : <code>DECISION: ARRET_DEFINITIF (Code sortie normal 0)</code><br>\n     * Si <code>EXIT_CODE != 0</code> : <code>DECISION: REDEMARRER (Echec detecte: code &lt;code&gt;)</code><br>\nAfficher :<br>\n<code>EVENEMENT: &lt;entree&gt; -&gt; &lt;DECISION&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c6-e3) — Simulateur de politique de redémarrage (Restart Policy)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Dans ce modèle, un arrêt manuel empêche la relance immédiate ; le redémarrage du daemon n'est pas simulé.",
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
        "label": "Arrêt manuel prioritaire et échec non nul",
        "stdin": "POLITIQUE=no EXIT_CODE=42 MANUEL=OUI\nPOLITIQUE=on-failure EXIT_CODE=42 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=no EXIT_CODE=42 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=42 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 42)"
      },
      {
        "label": "Code zéro et un selon la politique",
        "stdin": "POLITIQUE=always EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=on-failure EXIT_CODE=1 MANUEL=NON",
        "expected": "EVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=unless-stopped EXIT_CODE=0 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)\nEVENEMENT: POLITIQUE=on-failure EXIT_CODE=1 MANUEL=NON -> DECISION: REDEMARRER (Echec detecte: code 1)"
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  delete values\n  for (index_field = 1; index_field <= NF; index_field++) {\n    equals = index($index_field, \"=\")\n    if (equals) values[substr($index_field, 1, equals - 1)] = substr($index_field, equals + 1)\n  }\n  policy = values[\"POLITIQUE\"]\n  code = values[\"EXIT_CODE\"]\n  if (values[\"MANUEL\"] == \"OUI\") decision = \"ARRET_DEFINITIF (Arret volontaire par l\\047administrateur)\"\n  else if (policy == \"no\") decision = \"ARRET_DEFINITIF (Politique \\\"no\\\")\"\n  else if (policy == \"always\" || policy == \"unless-stopped\") decision = \"REDEMARRER (Relance automatique du conteneur)\"\n  else if (policy == \"on-failure\" && code + 0 == 0) decision = \"ARRET_DEFINITIF (Code sortie normal 0)\"\n  else if (policy == \"on-failure\") decision = \"REDEMARRER (Echec detecte: code \" code \")\"\n  else next\n  printf \"EVENEMENT: %s -> DECISION: %s\\n\", $0, decision\n}\n'\n"
  }
];

const DK2_INDEPENDENCE_TESTS = {
  "dk2-c1-e1": [
    {
      "label": "Namespace en minuscules sans cgroup",
      "stdin": "pid",
      "expected": "pid -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)"
    }
  ],
  "dk2-c1-e2": [
    {
      "label": "Disque invité positif et RAM applicative nulle",
      "stdin": "2 5 0\n10 1",
      "expected": "ARCHITECTURE VM: Disque 30 Mo | RAM 2 Mo\nARCHITECTURE DOCKER: Disque 10 Mo | RAM 0 Mo\nECONOMIE DOCKER: Disque -20 Mo | RAM -2 Mo"
    },
    {
      "label": "Disque invité nul et RAM applicative positive",
      "stdin": "2 5 8\n0 0",
      "expected": "ARCHITECTURE VM: Disque 10 Mo | RAM 16 Mo\nARCHITECTURE DOCKER: Disque 10 Mo | RAM 16 Mo\nECONOMIE DOCKER: Disque -0 Mo | RAM -0 Mo"
    }
  ],
  "dk2-c2-e1": [
    {
      "label": "Deux images avec une seule couche partagée",
      "stdin": "One : base:6\nTwo : base:6",
      "expected": "IMAGE: One -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Two -> TAILLE_APPARENTE: 6 Mo\nTOTAL_BRUT: 12 Mo | TOTAL_REEL: 6 Mo | ECONOMIE_DEDUPLICATION: -6 Mo"
    }
  ],
  "dk2-c2-e2": [
    {
      "label": "Registre à port et tag explicite",
      "stdin": "localhost:5000/team/app:v1",
      "expected": "REF: localhost:5000/team/app:v1 -> REGISTRE: localhost:5000 | IMAGE: team/app | TAG: v1 | DIGEST: NONE"
    }
  ],
  "dk2-c3-e1": [
    {
      "label": "ADD local sans commande apt",
      "stdin": "FROM alpine\nADD config.txt /opt/",
      "expected": "AVERTISSEMENT [Ligne 2]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))"
    }
  ],
  "dk2-c3-e3": [
    {
      "label": "Image finale égale à la moitié du monolithique",
      "stdin": "MONOLITHIC: base 10 + 4 + 2 + 4\nSTAGE_BUILD: base 20 -> EXPORT: 4\nSTAGE_FINAL: slim 6 + IMPORT: 4",
      "expected": "IMAGE_MONOLITHIQUE: 20 Mo\nIMAGE_MULTI_STAGE: 10 Mo\nGAIN_SECURITE_ET_TAILLE: -10 Mo (50.0% economises)"
    }
  ],
  "dk2-c5-e2": [
    {
      "label": "Chaîne unique de dépendances",
      "stdin": "front -> api\napi -> base\nbase -> NONE",
      "expected": "ORDRE_DEMARRAGE: base -> api -> front"
    }
  ],
  "dk2-c5-e3": [
    {
      "label": "Défaut pour une variable déclarée vide",
      "stdin": "EMPTY=\n---\nservice: ${EMPTY:-web}",
      "expected": "RESOLU: service: web"
    }
  ]
};

for (const exercise of DK2_EXERCISES) {
  if (DK2_INDEPENDENCE_TESTS[exercise.id]) exercise.tests.push(...DK2_INDEPENDENCE_TESTS[exercise.id]);
}

module.exports = DK2_EXERCISES;
