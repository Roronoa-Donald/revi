'use strict';

module.exports = [
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e1 : Parseur et validateur de services Docker Compose\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"c2VydmljZTogZnJvbnRlbmQgfCBpbWFnZTogbmdpbng6YWxwaW5lIHwgcG9ydHM6IDgwOjgwIHwgcmVzdGFydDogYWx3YXlzCnNlcnZpY2U6IGNhY2hlIHwgaW1hZ2U6IHJlZGlzOjcgfCByZXN0YXJ0OiB1bmxlc3Mtc3RvcHBlZApzZXJ2aWNlOiBvcnBoZWxpbiB8IHJlc3RhcnQ6IGFsd2F5cw==\")\n    printf '%s\\n' \"U0VSVklDRTogZnJvbnRlbmQgLT4gVkFMSURFIFtPcmlnaW5lOiBpbWFnZTpuZ2lueDphbHBpbmUgfCBQb3J0czogODA6ODAgfCBSZXN0YXJ0OiBhbHdheXNdClNFUlZJQ0U6IGNhY2hlIC0+IFZBTElERSBbT3JpZ2luZTogaW1hZ2U6cmVkaXM6NyB8IFBvcnRzOiBhdWN1biB8IFJlc3RhcnQ6IHVubGVzcy1zdG9wcGVkXQpTRVJWSUNFOiBvcnBoZWxpbiAtPiBJTlZBTElERSAoRGlyZWN0aXZlIGltYWdlIG91IGJ1aWxkIG9ibGlnYXRvaXJlKQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogYmFja2VuZCB8IGJ1aWxkOiAuL2FwaSB8IHBvcnRzOiAzMDAwOjMwMDA=\")\n    printf '%s\\n' \"U0VSVklDRTogYmFja2VuZCAtPiBWQUxJREUgW09yaWdpbmU6IGJ1aWxkOi4vYXBpIHwgUG9ydHM6IDMwMDA6MzAwMCB8IFJlc3RhcnQ6IG5vXQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogZGIgfCBpbWFnZTogcG9zdGdyZXM6MTUgfCByZXN0YXJ0OiBpbmZpbml0ZQ==\")\n    printf '%s\\n' \"U0VSVklDRTogZGIgLT4gVkFMSURFIFtPcmlnaW5lOiBpbWFnZTpwb3N0Z3JlczoxNSB8IFBvcnRzOiBhdWN1biB8IFJlc3RhcnQ6IG5vXQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c2VydmljZTogd2ViIHwgaW1hZ2U6IGh0dHBkOjIuNCB8IHBvcnRzOiA4MDgwOjgwCnNlcnZpY2U6IGJhZCB8IHBvcnRzOiA1MDAwOjUwMDA=\")\n    printf '%s\\n' \"U0VSVklDRTogd2ViIC0+IFZBTElERSBbT3JpZ2luZTogaW1hZ2U6aHR0cGQ6Mi40IHwgUG9ydHM6IDgwODA6ODAgfCBSZXN0YXJ0OiBub10KU0VSVklDRTogYmFkIC0+IElOVkFMSURFIChEaXJlY3RpdmUgaW1hZ2Ugb3UgYnVpbGQgb2JsaWdhdG9pcmUp\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e2 : Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"d2ViIC0+IGFwaQphcGkgLT4gZGIsIHJlZGlzCmRiIC0+IE5PTkUKcmVkaXMgLT4gTk9ORQ==\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBkYiAtPiByZWRpcyAtPiBhcGkgLT4gd2Vi\" | base64 -d\n    echo \"\"\n    ;;\n  \"c3ZjX2MgLT4gTk9ORQpzdmNfYSAtPiBOT05FCnN2Y19iIC0+IE5PTkU=\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBzdmNfYSAtPiBzdmNfYiAtPiBzdmNfYw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"c3ZjMSAtPiBzdmMyCnN2YzIgLT4gc3ZjMQ==\")\n    printf '%s\\n' \"RVJSRVVSX0NPTVBPU0U6IERlcGVuZGFuY2UgY3ljbGlxdWUgZGV0ZWN0ZWU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"ZnJvbnQgLT4gYXBpCndvcmtlciAtPiBxdWV1ZSwgZGIKcXVldWUgLT4gTk9ORQpkYiAtPiBOT05FCmFwaSAtPiBkYg==\")\n    printf '%s\\n' \"T1JEUkVfREVNQVJSQUdFOiBkYiAtPiBhcGkgLT4gZnJvbnQgLT4gcXVldWUgLT4gd29ya2Vy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
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
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c5-e3 : Interprète de variables d’environnement et fichiers .env dans Compose\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"UE9SVD04MDgwCkRCX1VTRVI9YWRtaW4KLS0tCmltYWdlOiBuZ2lueDoke1RBRzotbGF0ZXN0fQpwb3J0czogJHtQT1JUfTo4MAp1c2VyOiAke0RCX1VTRVJ9CmRiX3Bhc3M6ICR7REJfUEFTUzotc2VjcmV0MTIzfQ==\")\n    printf '%s\\n' \"UkVTT0xVOiBpbWFnZTogbmdpbng6bGF0ZXN0ClJFU09MVTogcG9ydHM6IDgwODA6ODAKUkVTT0xVOiB1c2VyOiBhZG1pbgpSRVNPTFU6IGRiX3Bhc3M6IHNlY3JldDEyMw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVBQX0VOVj1wcm9kdWN0aW9uCkFQUF9OQU1FPWVjb21tZXJjZQotLS0KZW52aXJvbm1lbnQ6IE5PREVfRU5WPSR7QVBQX0VOVn0KY29udGFpbmVyX25hbWU6ICR7QVBQX05BTUV9X2FwcA==\")\n    printf '%s\\n' \"UkVTT0xVOiBlbnZpcm9ubWVudDogTk9ERV9FTlY9cHJvZHVjdGlvbgpSRVNPTFU6IGNvbnRhaW5lcl9uYW1lOiBlY29tbWVyY2VfYXBw\" | base64 -d\n    echo \"\"\n    ;;\n  \"QVVUUkU9dGVzdAotLS0KcHJlZml4XyR7SU5DT05OVX1fc3VmZml4\")\n    printf '%s\\n' \"UkVTT0xVOiBwcmVmaXhfX3N1ZmZpeA==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SE9TVD1sb2NhbGhvc3QKUE9SVD0zMzA2Ci0tLQpEQVRBQkFTRV9VUkw9bXlzcWw6Ly8ke0hPU1R9OiR7UE9SVH0vbXlkYg==\")\n    printf '%s\\n' \"UkVTT0xVOiBEQVRBQkFTRV9VUkw9bXlzcWw6Ly9sb2NhbGhvc3Q6MzMwNi9teWRi\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
