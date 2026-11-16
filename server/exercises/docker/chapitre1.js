'use strict';

module.exports = [
  {
    "id": "dk2-c1-e1",
    "chapter": 1,
    "title": "Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)",
    "level": "n1",
    "language": "shell",
    "goal": "Distinguer les primitives du noyau Linux sous-jacentes à Docker : Namespaces (vue isolée) et Cgroups (limitation des ressources).",
    "brief": "<p>Le script Bash lit un code par ligne non vide sur l’entrée standard (stdin). La recherche ignore la casse et la sortie conserve le code saisi.<br>\nSelon les fondements de la conteneurisation :<br>\n- <strong>Namespaces (Isolation de l'espace de visibilité)</strong> :<br>\n  * <code>PID</code> -&gt; <code>Arborescence des processus isolée (le conteneur voit son propre PID 1)</code><br>\n  * <code>NET</code> -&gt; <code>Interfaces reseau, tables de routage et ports isoles</code><br>\n  * <code>MNT</code> -&gt; <code>Points de montage de systeme de fichiers et arborescence racine</code><br>\n  * <code>IPC</code> -&gt; <code>Communications inter-processus (memoire partagee, files de messages)</code><br>\n  * <code>UTS</code> -&gt; <code>Nom d'hote (hostname) et nom de domaine NIS</code><br>\n  * <code>USER</code> -&gt; <code>Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)</code><br>\nLe mappage USER ci-dessus est un exemple : la correspondance des UID dépend de la configuration et n'est pas systématiquement différente entre hôte et conteneur.<br>\n- <strong>Cgroups (Contrôle et limitation des ressources)</strong> :<br>\n  * <code>CPU_LIMIT</code> -&gt; <code>Plafond de temps de calcul CPU (quotas CFS)</code><br>\n  * <code>MEM_LIMIT</code> -&gt; <code>Plafond de memoire vive RAM et gestion de l'OOM-Killer</code><br>\n  * <code>IO_THROTTLE</code> -&gt; <code>Debit maximal en lecture et ecriture sur les disques blocs</code><br>\nPour chaque entrée, afficher :<br>\n<code>&lt;MECANISME&gt; -&gt; PRIMITIVE: &lt;NAMESPACE|CGROUP&gt; | &lt;DESCRIPTION&gt;</code><br>\nSi le mécanisme n'est pas reconnu :<br>\n<code>&lt;MECANISME&gt; -&gt; INCONNU</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e1) — Analyseur de primitives d’isolation Linux (Namespaces vs Cgroups)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Utiliser un dictionnaire associant chaque code à son type et sa description.",
      "Gérer la casse pour accepter les noms en majuscules.",
      "Pour chaque ligne : normaliser le code en majuscules, le chercher dans la table des namespaces puis des cgroups, afficher PRIMITIVE et sa description, sinon INCONNU."
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
      },
      {
        "label": "Namespace en minuscules sans cgroup",
        "stdin": "pid",
        "expected": "pid -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  type[\"PID\"] = type[\"NET\"] = type[\"MNT\"] = type[\"IPC\"] = type[\"UTS\"] = type[\"USER\"] = \"NAMESPACE\"\n  type[\"CPU_LIMIT\"] = type[\"MEM_LIMIT\"] = type[\"IO_THROTTLE\"] = \"CGROUP\"\n  description[\"PID\"] = \"Arborescence des processus isolée (le conteneur voit son propre PID 1)\"\n  description[\"NET\"] = \"Interfaces reseau, tables de routage et ports isoles\"\n  description[\"MNT\"] = \"Points de montage de systeme de fichiers et arborescence racine\"\n  description[\"IPC\"] = \"Communications inter-processus (memoire partagee, files de messages)\"\n  description[\"UTS\"] = \"Nom d\\047hote (hostname) et nom de domaine NIS\"\n  description[\"USER\"] = \"Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l\\047hote)\"\n  description[\"CPU_LIMIT\"] = \"Plafond de temps de calcul CPU (quotas CFS)\"\n  description[\"MEM_LIMIT\"] = \"Plafond de memoire vive RAM et gestion de l\\047OOM-Killer\"\n  description[\"IO_THROTTLE\"] = \"Debit maximal en lecture et ecriture sur les disques blocs\"\n}\nNF {\n  code = toupper($0)\n  if (code in type) printf \"%s -> PRIMITIVE: %s | %s\\n\", $0, type[code], description[code]\n  else printf \"%s -> INCONNU\\n\", $0\n}\n'\n",
    "takeaway": "Les Namespaces isolent ce qu un processus voit (PID, réseau, FS) tandis que les Cgroups limitent les ressources qu il consomme."
  },
  {
    "id": "dk2-c1-e2",
    "chapter": 1,
    "title": "Comparateur d’empreinte mémoire et stockage : VM vs Conteneur",
    "level": "n2",
    "language": "shell",
    "goal": "Quantifier l’overhead de virtualisation lourde (Hyperviseur + Guest OS complet) face à la conteneurisation légère.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin). Les valeurs sont des entiers positifs ou nuls.<br>\n- Première ligne : <code>&lt;NbInstances&gt; &lt;TailleAppMo&gt; &lt;RamAppMo&gt;</code>.<br>\n- Deuxième ligne : <code>&lt;TailleGuestOsMo&gt; &lt;RamGuestOsMo&gt;</code> (ressources consommées par l'OS invité dans une machine virtuelle).<br>\nCe calcul est un modèle simplifié : il suppose une copie de l'application par instance, le noyau de l'hôte partagé et aucun autre coût. Il ne mesure pas les ressources réelles d'une installation Docker.<br>\nCalculer :<br>\n1. <strong>VM</strong> :<br>\n   - Disque total VM = <code>NbInstances * (TailleAppMo + TailleGuestOsMo)</code><br>\n   - RAM totale VM = <code>NbInstances * (RamAppMo + RamGuestOsMo)</code><br>\n2. <strong>DOCKER</strong> :<br>\n   - Disque total Docker = <code>NbInstances * TailleAppMo</code><br>\n   - RAM totale Docker = <code>NbInstances * RamAppMo</code><br>\n3. <strong>GAINS</strong> :<br>\n   - Gain disque = <code>Disque VM - Disque Docker</code><br>\n   - Gain RAM = <code>RAM VM - RAM Docker</code><br>\nAfficher :<br>\n<code>ARCHITECTURE VM: Disque &lt;Dvm&gt; Mo | RAM &lt;Rvm&gt; Mo</code><br>\n<code>ARCHITECTURE DOCKER: Disque &lt;Ddoc&gt; Mo | RAM &lt;Rdoc&gt; Mo</code><br>\n<code>ECONOMIE DOCKER: Disque -&lt;GainD&gt; Mo | RAM -&lt;GainR&gt; Mo</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e2) — Comparateur d’empreinte mémoire et stockage : VM vs Conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Chaque VM duplique un système d’exploitation complet (Guest OS), tandis que Docker partage le noyau hôte.",
      "Suivre rigoureusement le gabarit textuel d’affichage.",
      "Pour chaque cas : lire les trois nombres puis la ligne Guest OS ; calculer disque et RAM de chaque architecture par multiplication, puis soustraire pour livrer l économie."
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
      },
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
    "solution": "#!/usr/bin/env bash\nawk '\nfunction normalize_decimal(value) {\n  sub(/^[+]/, \"\", value)\n  sub(/^0+/, \"\", value)\n  return value == \"\" ? \"0\" : value\n}\nfunction add_decimal(left, right, left_index, right_index, carry, total, result) {\n  left_index = length(left)\n  right_index = length(right)\n  carry = 0\n  result = \"\"\n  while (left_index > 0 || right_index > 0 || carry > 0) {\n    total = carry\n    if (left_index > 0) total += substr(left, left_index--, 1)\n    if (right_index > 0) total += substr(right, right_index--, 1)\n    result = (total % 10) result\n    carry = int(total / 10)\n  }\n  return result\n}\nfunction multiply_decimal(left, right, left_parts, right_parts, product, left_count, right_count, position, start, row, column, carry, total, highest, result) {\n  left = normalize_decimal(left)\n  right = normalize_decimal(right)\n  if (left == \"0\" || right == \"0\") return \"0\"\n  left_count = 0\n  for (position = length(left); position > 0; position -= 7) {\n    start = position - 6\n    if (start < 1) start = 1\n    left_parts[++left_count] = substr(left, start, position - start + 1) + 0\n  }\n  right_count = 0\n  for (position = length(right); position > 0; position -= 7) {\n    start = position - 6\n    if (start < 1) start = 1\n    right_parts[++right_count] = substr(right, start, position - start + 1) + 0\n  }\n  for (row = 1; row <= left_count; row++) {\n    carry = 0\n    for (column = 1; column <= right_count; column++) {\n      total = product[row + column - 1] + left_parts[row] * right_parts[column] + carry\n      product[row + column - 1] = total % 10000000\n      carry = int(total / 10000000)\n    }\n    product[row + right_count] = carry\n  }\n  highest = left_count + right_count\n  if (product[highest] == 0) highest--\n  result = sprintf(\"%d\", product[highest])\n  for (position = highest - 1; position > 0; position--) result = result sprintf(\"%07d\", product[position])\n  return result\n}\nNR == 1 { instances = $1; app_disk = $2; app_ram = $3 }\nNR == 2 {\n  docker_disk = multiply_decimal(instances, app_disk)\n  docker_ram = multiply_decimal(instances, app_ram)\n  guest_disk = multiply_decimal(instances, $1)\n  guest_ram = multiply_decimal(instances, $2)\n  vm_disk = add_decimal(docker_disk, guest_disk)\n  vm_ram = add_decimal(docker_ram, guest_ram)\n  printf \"ARCHITECTURE VM: Disque %s Mo | RAM %s Mo\\n\", vm_disk, vm_ram\n  printf \"ARCHITECTURE DOCKER: Disque %s Mo | RAM %s Mo\\n\", docker_disk, docker_ram\n  printf \"ECONOMIE DOCKER: Disque -%s Mo | RAM -%s Mo\\n\", guest_disk, guest_ram\n}\n'\n",
    "takeaway": "Un conteneur partage le noyau de l hôte et évite le surcoût mémoire et de démarrage d un OS invité complet."
  },
  {
    "id": "dk2-c1-e3",
    "chapter": 1,
    "title": "Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)",
    "level": "n3",
    "language": "shell",
    "goal": "Identifier le rôle de chaque brique logicielle composant la stack Docker moderne conforme OCI.",
    "brief": "<p>Le script Bash lit un identifiant par ligne non vide sur l’entrée standard (stdin).<br>\nSelon l'architecture interne de Docker :<br>\n- <code>CLI</code> : <code>docker (client) -&gt; Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)</code><br>\n- <code>DOCKERD</code> : <code>dockerd (daemon) -&gt; Gestionnaire haut niveau des images, volumes, reseaux et authentification</code><br>\n- <code>CONTAINERD</code> : <code>containerd -&gt; Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)</code><br>\n- <code>SHIM</code> : <code>containerd-shim -&gt; Processus leger maintenant les E/S et l'etat sans dependre du daemon</code><br>\n- <code>RUNC</code> : <code>runc (OCI runtime) -&gt; Cree les namespaces et cgroups, puis execute le binaire conteneurise</code><br>\nPour chaque opération, afficher :<br>\n<code>&lt;ID&gt; -&gt; &lt;COMPOSANT&gt; | &lt;ROLE&gt;</code><br>\nSi l'opération n'est pas listée :<br>\n<code>&lt;ID&gt; -&gt; INCONNU</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c1-e3) — Inspecteur des composants de l’architecture Docker (Daemon, Containerd, Runc)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "dockerd délègue à containerd, qui invoque runc pour démarrer le processus puis laisse containerd-shim.",
      "Respecter strictement le format de sortie.",
      "Pour chaque ligne : lire le code du composant, le rechercher dans la table des cinq briques, afficher son nom technique puis son rôle exact."
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
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  component[\"CLI\"] = \"docker (client)\"\n  component[\"DOCKERD\"] = \"dockerd (daemon)\"\n  component[\"CONTAINERD\"] = \"containerd\"\n  component[\"SHIM\"] = \"containerd-shim\"\n  component[\"RUNC\"] = \"runc (OCI runtime)\"\n  role[\"CLI\"] = \"Interprete les commandes utilisateur et communique via l\\047API REST (socket UNIX)\"\n  role[\"DOCKERD\"] = \"Gestionnaire haut niveau des images, volumes, reseaux et authentification\"\n  role[\"CONTAINERD\"] = \"Superviseur de conteneurs (cycle de vie, distribution d\\047images et snapshots)\"\n  role[\"SHIM\"] = \"Processus leger maintenant les E/S et l\\047etat sans dependre du daemon\"\n  role[\"RUNC\"] = \"Cree les namespaces et cgroups, puis execute le binaire conteneurise\"\n}\nNF {\n  if ($0 in component) printf \"%s -> %s | %s\\n\", $0, component[$0], role[$0]\n  else printf \"%s -> INCONNU\\n\", $0\n}\n'\n",
    "takeaway": "Docker sépare la CLI/démon (dockerd), le gestionnaire de cycle de vie (containerd) et le runtime OCI bas niveau (runc)."
  }
];
