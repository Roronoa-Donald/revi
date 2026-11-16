'use strict';

module.exports = [
  {
    "id": "dk2-c5-e1",
    "chapter": 5,
    "title": "Parseur et validateur de services Docker Compose",
    "level": "n1",
    "language": "shell",
    "goal": "Valider la structure des déclarations de services dans une spécification Docker Compose.",
    "brief": "<p>Le script Bash lit un service par ligne sur l’entrée standard (stdin), au format <code>service: nom | image: valeur | ports: valeur | restart: valeur</code> ; <code>build</code> peut remplacer ou accompagner <code>image</code>. Les champs facultatifs peuvent être omis ou réordonnés.<br>\nCe format et les règles suivantes sont ceux d'un modèle d'exercice, pas un validateur complet de Compose : une valeur <code>restart</code> inconnue est ramenée à <code>no</code> par convention. Une valeur vide ne compte pas comme image ou build ; si les deux sont renseignés, afficher l'image comme origine.<br>\nRègles de validation :<br>\n1. Chaque service DOIT comporter au moins une directive <code>image</code> OU <code>build</code>.<br>\n2. La directive <code>restart</code>, si présente, doit être parmi : <code>no</code>, <code>always</code>, <code>unless-stopped</code>, <code>on-failure</code>. (Sinon <code>no</code> par défaut).<br>\nPour chaque service :<br>\n- Si valide : <code>SERVICE: &lt;Nom&gt; -&gt; VALIDE [Origine: &lt;ImageOuBuild&gt; | Ports: &lt;PortsOuAucun&gt; | Restart: &lt;Restart&gt;]</code><br>\n- Si ni image ni build n'est défini : <code>SERVICE: &lt;Nom&gt; -&gt; INVALIDE (Directive image ou build obligatoire)</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e1) — Parseur et validateur de services Docker Compose\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Découper chaque ligne par le caractère pipe |.",
      "Extraire les paires cle: valeur.",
      "Pour chaque service : relever image ou build, ports et restart ; si l origine manque, le déclarer INVALIDE, sinon restituer la ligne VALIDE avec les valeurs par défaut."
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
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  delete values\n  count = split($0, fields, \"|\")\n  for (index_field = 1; index_field <= count; index_field++) {\n    colon = index(fields[index_field], \":\")\n    if (colon) values[trim(substr(fields[index_field], 1, colon - 1))] = trim(substr(fields[index_field], colon + 1))\n  }\n  name = values[\"service\"]\n  if (values[\"image\"] != \"\") origin = \"image:\" values[\"image\"]\n  else if (values[\"build\"] != \"\") origin = \"build:\" values[\"build\"]\n  else { printf \"SERVICE: %s -> INVALIDE (Directive image ou build obligatoire)\\n\", name; next }\n  ports = values[\"ports\"] != \"\" ? values[\"ports\"] : \"aucun\"\n  restart = values[\"restart\"]\n  if (restart != \"no\" && restart != \"always\" && restart != \"unless-stopped\" && restart != \"on-failure\") restart = \"no\"\n  printf \"SERVICE: %s -> VALIDE [Origine: %s | Ports: %s | Restart: %s]\\n\", name, origin, ports, restart\n}\n'\n",
    "takeaway": "Docker Compose déclare services, réseaux et volumes de manière déclarative pour démarrer une pile multi-conteneurs d un bloc."
  },
  {
    "id": "dk2-c5-e2",
    "chapter": 5,
    "title": "Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)",
    "level": "n2",
    "language": "shell",
    "goal": "Calculer l’ordre d’instanciation séquentiel des conteneurs via un tri topologique sans cycle.",
    "brief": "<p>Le script Bash lit une ligne par service sur l’entrée standard (stdin), au format <code>&lt;service&gt; -&gt; &lt;dépendance1, dépendance2, ... ou NONE&gt;</code>. Une dépendance mentionnée est aussi un service, même sans ligne propre.<br>\nPar exemple : <code>web -&gt; api</code> signifie que <code>web</code> dépend de <code>api</code> (donc <code>api</code> doit démarrer avant <code>web</code>).<br>\nRègles :<br>\n- Effectuer un tri topologique des services.<br>\n- À chaque étape, parmi les services dont toutes les dépendances sont déjà démarrées, choisir le premier par ordre alphabétique. Une dépendance répétée ne compte qu'une fois.<br>\n- Si une boucle de dépendance, y compris sur un service lui-même, est détectée, afficher : <code>ERREUR_COMPOSE: Dependance cyclique detectee</code>.<br>\n- Sinon, afficher l'ordre de ce modèle séquentiel :<br>\n<code>ORDRE_DEMARRAGE: &lt;S1&gt; -&gt; &lt;S2&gt; -&gt; ...</code><br>Une entrée sans service donne <code>ORDRE_DEMARRAGE:</code>. Cet ordre ne garantit pas que les applications soient prêtes à recevoir des requêtes.</p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e2) — Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Construire la liste d’adjacence et les degrés entrants.",
      "Un service avec 0 dépendance restante peut démarrer immédiatement.",
      "Répéter : extraire alphabétiquement les services sans dépendance restante, les afficher puis retirer leurs arcs ; si aucun ne démarre alors qu il en reste, signaler le cycle."
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
      },
      {
        "label": "Chaîne unique de dépendances",
        "stdin": "front -> api\napi -> base\nbase -> NONE",
        "expected": "ORDRE_DEMARRAGE: base -> api -> front"
      }
    ],
    "solution": "#!/usr/bin/env bash\nLC_ALL=C awk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  arrow = index($0, \"->\")\n  service = trim(substr($0, 1, arrow - 1))\n  dependencies = trim(substr($0, arrow + 2))\n  services[service] = 1\n  if (dependencies != \"NONE\" && dependencies != \"\") {\n    count = split(dependencies, parts, \",\")\n    for (index_part = 1; index_part <= count; index_part++) {\n      dependency = trim(parts[index_part])\n      services[dependency] = 1\n      if (!((service, dependency) in edge)) { edge[service, dependency] = 1; degree[service]++ }\n    }\n  }\n}\nEND {\n  for (service in services) total++\n  for (completed = 0; completed < total; completed++) {\n    choice = \"\"\n    for (service in services)\n      if (!done[service] && degree[service] == 0 && (choice == \"\" || service < choice)) choice = service\n    if (choice == \"\") { print \"ERREUR_COMPOSE: Dependance cyclique detectee\"; exit }\n    done[choice] = 1\n    order = order (order == \"\" ? \"\" : \" -> \") choice\n    for (service in services) if ((service, choice) in edge) degree[service]--\n  }\n  printf \"ORDRE_DEMARRAGE:\"\n  if (order != \"\") printf \" %s\", order\n  printf \"\\n\"\n}\n'\n",
    "takeaway": "Un graphe depends_on acyclique impose un tri topologique pour orchestrer le lancement dans l ordre des dépendances."
  },
  {
    "id": "dk2-c5-e3",
    "chapter": 5,
    "title": "Interprète de variables d’environnement et fichiers .env dans Compose",
    "level": "n3",
    "language": "shell",
    "goal": "Résoudre les syntaxes d’interpolation `${VAR}` et `${VAR:-default}` dans les fichiers de configuration Compose.",
    "brief": "<p>Le script Bash lit deux blocs sur l’entrée standard (stdin).<br>\n- Bloc 1 : une affectation simple <code>NOM=valeur</code> par ligne, représentant les valeurs d'un fichier <code>.env</code>.<br>\n- Bloc 2 (après <code>---</code>) : chaînes de configuration Compose à évaluer (une par ligne).<br>\nCe modèle utilise uniquement le premier bloc ; il ne reproduit pas les priorités entre environnement du shell et fichiers Compose. Les noms suivent le format <code>[A-Za-z_][A-Za-z0-9_]*</code>, les valeurs sont du texte littéral, et les interpolations imbriquées ou échappées ne sont pas traitées.<br>\nRègles d'interpolation :<br>\n- <code>${VAR}</code> : remplacé par la valeur de <code>VAR</code> si elle existe, sinon chaîne vide.<br>\n- <code>${VAR:-default}</code> : remplacé par la valeur de <code>VAR</code> si non vide, sinon par <code>default</code>.<br>\nPour chaque chaîne du bloc 2, afficher :<br>\n<code>RESOLU: &lt;ChaineApresInterpolation&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c5-e3) — Interprète de variables d’environnement et fichiers .env dans Compose\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Gérer les expressions régulières ou le parcours caractère par caractère pour repérer ${...}.",
      "Séparer proprement le bloc .env du bloc Compose via le délimiteur ---.",
      "Pour chaque chaîne du bloc 2 : repérer les ${VAR} et ${VAR:-defaut}, remplacer par la valeur du bloc 1, la valeur par défaut si définie, ou la chaîne vide si absente."
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
      },
      {
        "label": "Défaut pour une variable déclarée vide",
        "stdin": "EMPTY=\n---\nservice: ${EMPTY:-web}",
        "expected": "RESOLU: service: web"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\n$0 == \"---\" && !configuration { configuration = 1; next }\n!configuration {\n  equals = index($0, \"=\")\n  if (equals) values[substr($0, 1, equals - 1)] = substr($0, equals + 1)\n  next\n}\n{\n  remaining = $0\n  result = \"\"\n  while (match(remaining, /\\$\\{[A-Za-z_][A-Za-z0-9_]*(:-[^}]*)?\\}/)) {\n    result = result substr(remaining, 1, RSTART - 1)\n    token = substr(remaining, RSTART + 2, RLENGTH - 3)\n    split_at = index(token, \":-\")\n    if (split_at) {\n      name = substr(token, 1, split_at - 1)\n      fallback = substr(token, split_at + 2)\n      replacement = values[name] != \"\" ? values[name] : fallback\n    } else replacement = values[token]\n    result = result replacement\n    remaining = substr(remaining, RSTART + RLENGTH)\n  }\n  printf \"RESOLU: %s%s\\n\", result, remaining\n}\n'\n",
    "takeaway": "L interpolation ${VAR:-defaut} dans Compose injecte des paramètres d environnement sûrs avec valeur de repli explicite."
  }
];
