'use strict';

module.exports = [
  {
    "id": "dk2-c4-e1",
    "chapter": 4,
    "title": "Gestionnaire d’états du cycle de vie d’un conteneur",
    "level": "n1",
    "language": "shell",
    "goal": "Simuler la machine à états finis du cycle de vie d’un conteneur Docker et valider les transitions de commandes.",
    "brief": "<p>Le script Bash lit une commande par ligne sur l’entrée standard (stdin). L’état initial est <code>ABSENT</code>. Une action invalide ne change pas cet état.<br>\nÉtats possibles : <code>ABSENT</code>, <code>CREATED</code>, <code>RUNNING</code>, <code>PAUSED</code>, <code>STOPPED</code>.<br>\nRègles de transition :<br>\n- Depuis <code>ABSENT</code> : <code>create</code> -&gt; <code>CREATED</code>, <code>run</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>CREATED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Depuis <code>RUNNING</code> : <code>pause</code> -&gt; <code>PAUSED</code>, <code>stop</code> -&gt; <code>STOPPED</code>, <code>restart</code> -&gt; <code>RUNNING</code>, <code>kill</code> -&gt; <code>STOPPED</code>.<br>\n- Depuis <code>PAUSED</code> : <code>unpause</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>STOPPED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Si une commande <code>rm</code> est tentée sur <code>RUNNING</code> ou <code>PAUSED</code> sans option force : afficher <code>TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: &lt;ETAT&gt;)</code>.<br>\n- Pour toute autre action invalide : afficher <code>TRANSITION_INVALIDE: Action &lt;cmd&gt; impossible depuis l'etat &lt;ETAT&gt;</code>.<br>\n- Si la transition est valide, afficher :<br>\n<code>&lt;CMD&gt; -&gt; NOUVEL_ETAT: &lt;NOUVEL_ETAT&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e1) — Gestionnaire d’états du cycle de vie d’un conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Initialiser l’état à ABSENT.",
      "Gérer scrupuleusement les conditions de rejet.",
      "Pour chaque commande : lire l état courant, chercher la transition dans la table ; si elle est absente ou rm sans --force sur un actif, signaler TRANSITION_INVALIDE, sinon afficher le nouvel état."
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
    "solution": "#!/usr/bin/env bash\nawk '\nBEGIN {\n  state = \"ABSENT\"\n  transition[\"ABSENT\", \"create\"] = \"CREATED\"\n  transition[\"ABSENT\", \"run\"] = \"RUNNING\"\n  transition[\"CREATED\", \"start\"] = \"RUNNING\"\n  transition[\"CREATED\", \"rm\"] = \"ABSENT\"\n  transition[\"RUNNING\", \"pause\"] = \"PAUSED\"\n  transition[\"RUNNING\", \"stop\"] = \"STOPPED\"\n  transition[\"RUNNING\", \"restart\"] = \"RUNNING\"\n  transition[\"RUNNING\", \"kill\"] = \"STOPPED\"\n  transition[\"PAUSED\", \"unpause\"] = \"RUNNING\"\n  transition[\"STOPPED\", \"start\"] = \"RUNNING\"\n  transition[\"STOPPED\", \"rm\"] = \"ABSENT\"\n}\nNF {\n  command = $0\n  if (command == \"rm\" && (state == \"RUNNING\" || state == \"PAUSED\"))\n    printf \"TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: %s)\\n\", state\n  else if ((state, command) in transition) {\n    state = transition[state, command]\n    printf \"%s -> NOUVEL_ETAT: %s\\n\", command, state\n  } else printf \"TRANSITION_INVALIDE: Action %s impossible depuis l\\047etat %s\\n\", command, state\n}\n'\n",
    "takeaway": "Les commandes create, start, pause, stop et rm font transiter explicitement un conteneur à travers des états distincts."
  },
  {
    "id": "dk2-c4-e2",
    "chapter": 4,
    "title": "Simulateur de redirection de ports (Port Mapping NAT) et conflits",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la table de translation d’adresses NAT et détecter les collisions de ports hôte.",
    "brief": "<p>Le script Bash lit une publication par ligne sur l’entrée standard (stdin), au format <code>&lt;conteneur&gt; &lt;publication&gt;</code>. Les adresses sont IPv4 et les ports sont compris entre 1 et 65535.<br>\nFormats de publication :<br>\n- <code>HotePort:ConteneurPort</code> -&gt; IP par défaut <code>0.0.0.0</code>.<br>\n- <code>IP:HotePort:ConteneurPort</code>.<br>\nRègles de validation :<br>\n- Une paire (<code>IP_Hote</code>, <code>HotePort</code>) ne peut être allouée qu'à un seul conteneur. (L'IP <code>0.0.0.0</code> entre en conflit avec n'importe quelle IP spécifique sur le même port).<br>\n- Si le port est libre : enregistrer la règle et afficher :<br>\n  <code>PUBLICATION: &lt;Conteneur&gt; -&gt; NAT: &lt;IP&gt;:&lt;HotePort&gt; =&gt; &lt;ConteneurPort&gt;/tcp (SUCCES)</code><br>\n- S'il y a conflit de port sur l'hôte : indiquer la première réservation conflictuelle dans l'ordre d'entrée, puis afficher :<br>\n  <code>CONFLIT_PORT: &lt;Conteneur&gt; -&gt; Port hote &lt;HotePort&gt; deja reserve par &lt;ConteneurPrecedent&gt; (ECHEC)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e2) — Simulateur de redirection de ports (Port Mapping NAT) et conflits\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Gérer un dictionnaire associant (port) ou (ip, port) au conteneur propriétaire.",
      "0.0.0.0 écoute sur toutes les interfaces.",
      "Pour chaque ligne : extraire conteneur, IP, port hôte et port conteneur ; tester le conflit avec 0.0.0.0 et les adresses déjà enregistrées, sinon publier la règle NAT."
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF >= 2 {\n  container = $1\n  count = split($2, parts, \":\")\n  if (count == 2) { address = \"0.0.0.0\"; host_port = parts[1]; container_port = parts[2] }\n  else { address = parts[1]; host_port = parts[2]; container_port = parts[3] }\n  conflict = 0\n  for (index_rule = 1; index_rule <= allocated; index_rule++) {\n    if (ports[index_rule] + 0 == host_port + 0 && (addresses[index_rule] == address || addresses[index_rule] == \"0.0.0.0\" || address == \"0.0.0.0\")) {\n      conflict = index_rule\n      break\n    }\n  }\n  if (conflict) printf \"CONFLIT_PORT: %s -> Port hote %s deja reserve par %s (ECHEC)\\n\", container, host_port, owners[conflict]\n  else {\n    allocated++\n    addresses[allocated] = address\n    ports[allocated] = host_port\n    owners[allocated] = container\n    printf \"PUBLICATION: %s -> NAT: %s:%s => %s/tcp (SUCCES)\\n\", container, address, host_port, container_port\n  }\n}\n'\n",
    "takeaway": "Le mappage -p host:container relie un port hôte unique vers le conteneur ; deux conteneurs ne peuvent pas lier le même port hôte."
  },
  {
    "id": "dk2-c4-e3",
    "chapter": 4,
    "title": "Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs",
    "level": "n3",
    "language": "shell",
    "goal": "Qualifier la nature, la persistance et les droits d’accès des options de stockage Docker (-v, --mount, --tmpfs).",
    "brief": "<p>Le script Bash lit un montage par ligne sur l’entrée standard (stdin). Ce modèle traite <code>-v</code>, <code>--tmpfs</code> et les formes <code>--mount</code> décrites ci-dessous ; il suppose un daemon Linux local et ne détermine pas les réglages réels d'un plugin de volume. Le libellé du tmpfs est simplifié : son contenu peut aussi être écrit dans le swap de l'hôte. Le chemin des volumes indiqué est un exemple de configuration par défaut.<br>\nRègles d'analyse :<br>\n1. <code>--tmpfs &lt;cible&gt;</code> :<br>\n   - Type : <code>TMPFS</code><br>\n   - Localisation : <code>Memoire vive RAM de l'hote</code><br>\n   - Persistance : <code>VOLATILE (detruit a l'arret du conteneur)</code><br>\n   - Droits : <code>LECTURE_ECRITURE</code><br>\n2. <code>-v &lt;source&gt;:&lt;cible&gt;[:&lt;opt&gt;]</code> :<br>\n   - Si source commence par <code>/</code>, <code>./</code> ou <code>../</code> : Type <code>BIND_MOUNT</code>, Localisation <code>Repertoire specifique de la machine hote</code>.<br>\n   - Sinon : Type <code>VOLUME_NOMME</code>, Localisation <code>Espace reserve du daemon (/var/lib/docker/volumes/)</code>.<br>\n   - Persistance : <code>PERSISTANT (survit a docker rm)</code>.<br>\n   - Droits : <code>LECTURE_SEULE</code> si <code>ro</code> est spécifié, seul ou parmi des options séparées par des virgules, sinon <code>LECTURE_ECRITURE</code>.<br>\n3. <code>--mount type=bind,source=&lt;chemin&gt;,target=&lt;cible&gt;[,readonly]</code> et <code>--mount type=volume,source=&lt;nom&gt;,target=&lt;cible&gt;[,readonly]</code> suivent respectivement les règles du bind mount et du volume nommé ; <code>--mount type=tmpfs,target=&lt;cible&gt;</code> suit celles du tmpfs. L'ordre des champs n'est pas imposé.<br>\nAfficher :<br>\n<code>STOCKAGE: &lt;entree&gt; -&gt; TYPE: &lt;TYPE&gt; | &lt;LOCALISATION&gt; | &lt;PERSISTANCE&gt; | &lt;DROITS&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c4-e3) — Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Un chemin absolu ou relatif indique un Bind Mount.",
      "Un identifiant sans slash indique un volume Docker nommé.",
      "Pour chaque option : détecter --tmpfs en premier, puis -v ou --mount ; qualifier le type d après la source, la persistance et les droits (:ro) selon la table de l énoncé."
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
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  input = $0\n  type = \"\"\n  readonly = 0\n  if ($1 == \"--tmpfs\") type = \"TMPFS\"\n  else if ($1 == \"-v\") {\n    split($2, fields, \":\")\n    source = fields[1]\n    type = source ~ /^(\\/|\\.\\/|\\.\\.\\/)/ ? \"BIND_MOUNT\" : \"VOLUME_NOMME\"\n    option_count = split(fields[3], options, \",\")\n    for (index_option = 1; index_option <= option_count; index_option++) if (options[index_option] == \"ro\") readonly = 1\n  } else if ($1 == \"--mount\") {\n    values = substr($0, index($0, \" \") + 1)\n    count = split(values, fields, \",\")\n    for (index_field = 1; index_field <= count; index_field++) {\n      split(fields[index_field], pair, \"=\")\n      if (pair[1] == \"type\") mount_type = pair[2]\n      if (pair[1] == \"readonly\" && (pair[2] == \"\" || pair[2] == \"true\")) readonly = 1\n    }\n    if (mount_type == \"bind\") type = \"BIND_MOUNT\"\n    else if (mount_type == \"volume\") type = \"VOLUME_NOMME\"\n    else if (mount_type == \"tmpfs\") type = \"TMPFS\"\n  }\n  if (type == \"TMPFS\") {\n    location = \"Memoire vive RAM de l\\047hote\"\n    persistence = \"VOLATILE (detruit a l\\047arret du conteneur)\"\n  } else if (type == \"BIND_MOUNT\") {\n    location = \"Repertoire specifique de la machine hote\"\n    persistence = \"PERSISTANT (survit a docker rm)\"\n  } else if (type == \"VOLUME_NOMME\") {\n    location = \"Espace reserve du daemon (/var/lib/docker/volumes/)\"\n    persistence = \"PERSISTANT (survit a docker rm)\"\n  } else next\n  rights = readonly ? \"LECTURE_SEULE\" : \"LECTURE_ECRITURE\"\n  printf \"STOCKAGE: %s -> TYPE: %s | %s | %s | %s\\n\", input, type, location, persistence, rights\n}\n'\n",
    "takeaway": "Utilisez un volume nommé pour persister des données gérées par Docker, un bind mount pour le dev local et tmpfs pour la RAM éphémère."
  }
];
