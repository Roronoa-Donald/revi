'use strict';

module.exports = [
  {
    "id": "do3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "L'audit du Dockerfile de l'API Resto'Kit",
    "exampleTitle": "Exemple résolu — l'audit du Dockerfile de BlogFast",
    "goal": "Relire un Dockerfile réel et repérer les optimisations de cache, de sécurité et de taille d'image.",
    "brief": "<p><strong>Énoncé.</strong> Resto'Kit exploite l'API de commande en ligne d'une chaîne de restaurants. Son image Docker pèse 1,1 Go et chaque build retélécharge toutes les dépendances dès qu'une ligne de code change. Voici son Dockerfile :</p><pre>FROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]</pre><p>Règles de lecture : une image portant le suffixe « slim » ou « alpine » est allégée ; le cache Docker n'est réutilisé que si les instructions précédentes sont inchangées ; un conteneur s'exécute en root sauf si le Dockerfile précise un autre compte.</p><ol><li>L'image de base node:18 est-elle une image complète ou allégée ?</li><li>Recopiez l'instruction exacte qui copie l'intégralité du code source dans l'image.</li><li>Quelle instruction faudrait-il placer avant le RUN npm install pour que le cache des dépendances soit réutilisé ?</li><li>Quelle instruction manque-t-il pour éviter que le conteneur ne s'exécute en root ?</li><li>Quelle famille d'images de base minimales (nom précis) réduirait fortement la taille de l'image ?</li></ol>",
    "starter": "# Exercice — L'audit du Dockerfile de l'API Resto'Kit\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Type d'image de base]\nA_COMPLETER\n\n[Question 2 — Instruction qui copie tout le code]\nA_COMPLETER\n\n[Question 3 — Instruction à placer avant RUN npm install]\nA_COMPLETER\n\n[Question 4 — Instruction manquante contre root]\nA_COMPLETER\n\n[Question 5 — Famille d'images minimales]\nA_COMPLETER\n",
    "hints": [
      "Le cache Docker fonctionne dans l'ordre : chaque instruction n'est réutilisée que si les précédentes et son propre contenu sont inchangés.",
      "Copier d'abord le seul manifeste de dépendances (package.json) avant l'installation met le cache à l'abri, puis copier le code n'invalide plus rien.",
      "1. Regardez le nom de l'image après FROM. 2. Repérez le COPY qui invalide tout le cache. 3. Proposez COPY package.json . avant le RUN npm install. 4. L'instruction USER change le compte d'exécution. 5. Les images alpine sont les minimales."
    ],
    "examples": [
      {
        "stdin": "BlogFast (blog en Python) utilise :\nFROM python:3.12\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"python\", \"app.py\"]\n\n1) python:3.12 est une image complète.\n2) Tout le code est copié par COPY . .\n3) COPY requirements.txt . devrait précéder le pip install.\n4) L'instruction USER manque.\n5) Les images alpine (python:3.12-alpine) sont minimales.",
        "expected": "image complète — COPY . . — COPY requirements.txt . — USER — alpine",
        "note": "Ordonner les instructions du plus stable au plus volatil : la base, puis les dépendances, puis le code."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type d'image de base",
        "stdin": "q:1",
        "expected": "complete||une image complete||image complete"
      },
      {
        "label": "Question 2 — Instruction qui copie tout le code",
        "stdin": "q:2",
        "expected": "copy . .||copy . /app"
      },
      {
        "label": "Question 3 — Instruction à placer avant RUN npm install",
        "stdin": "q:3",
        "expected": "copy package.json .||copy package.json||copy package*.json .||copy package*.json"
      },
      {
        "label": "Question 4 — Instruction manquante contre root",
        "stdin": "q:4",
        "expected": "user||instruction user||l’instruction user||l'instruction user"
      },
      {
        "label": "Question 5 — Famille d'images minimales",
        "stdin": "q:5",
        "expected": "alpine||les images alpine||images alpine||slim"
      }
    ],
    "solution": "[Question 1 — Type d'image de base]\ncomplete\n\n[Question 2 — Instruction qui copie tout le code]\ncopy . .\n\n[Question 3 — Instruction à placer avant RUN npm install]\ncopy package.json .\n\n[Question 4 — Instruction manquante contre root]\nuser\n\n[Question 5 — Famille d'images minimales]\nalpine",
    "takeaway": "1) node:18 est l'image complète de Node.js : elle ne porte ni suffixe slim ni suffixe alpine.\n2) COPY . . copie tout le projet dans l'image : dès qu'un fichier change, le cache des instructions suivantes (npm install) est invalidé.\n3) COPY package.json . doit être placé avant RUN npm install : les dépendances ne sont alors réinstallées que si le manifeste change.\n4) L'instruction USER manque : sans elle, le processus s'exécute avec le compte root.\n5) Les images alpine (par exemple node:18-alpine) offrent une base minimale et réduisent fortement la taille finale.\nContrôle : un Dockerfile bien ordonné s'écrirait : FROM node:18-alpine, WORKDIR /app, COPY package.json ., RUN npm install, COPY . ., USER node, CMD."
  },
  {
    "id": "do3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'empreinte disque des images de la plateforme CloudCatalogue",
    "exampleTitle": "Exemple résolu — l'empreinte disque des images SuiviColis",
    "goal": "Quantifier l'économie d'espace disque permise par le partage des couches Docker entre plusieurs images d'un même hôte.",
    "brief": "<p><strong>Énoncé.</strong> CloudCatalogue déploie trois microservices avec Docker sur le même serveur d'intégration. Docker stocke les images par <strong>couches</strong> : deux images qui partagent une couche de même identifiant ne la stockent qu'<strong>une seule fois</strong> sur l'hôte. L'équipe dresse l'inventaire suivant :</p><table><tr><th>Image</th><th>Couches (identifiant:taille en Mo)</th></tr><tr><td>catalog-api</td><td>base_alpine:8, node_modules:120, code_api:15</td></tr><tr><td>catalog-worker</td><td>base_alpine:8, node_modules:120, code_worker:9</td></tr><tr><td>catalog-front</td><td>base_alpine:8, static_front:20</td></tr></table><p>La taille apparente d'une image est la somme de ses couches. Répondez par la valeur seule ; la question 5 se donne à une décimale près.</p><ol><li>Quelle est la taille apparente de catalog-api (en Mo) ?</li><li>Quelle est la taille brute cumulée des trois images (en Mo) ?</li><li>Quelle est la place réellement occupée sur l'hôte, en comptant chaque couche partagée une seule fois (en Mo) ?</li><li>Quelle est l'économie réalisée (en Mo) ?</li><li>Quelle est cette économie en pourcentage de la taille brute (en %) ?</li></ol>",
    "starter": "# Exercice — L'empreinte disque des images de la plateforme CloudCatalogue\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Taille apparente de catalog-api en Mo]\nA_COMPLETER\n\n[Question 2 — Taille brute cumulée en Mo]\nA_COMPLETER\n\n[Question 3 — Place réellement occupée en Mo]\nA_COMPLETER\n\n[Question 4 — Économie réalisée en Mo]\nA_COMPLETER\n\n[Question 5 — Économie en % de la taille brute]\nA_COMPLETER\n",
    "hints": [
      "Deux images construites sur la même base et les mêmes dépendances partagent ces couches : l'hôte ne les stocke qu'une fois.",
      "La taille brute additionne toutes les couches de chaque image ; l'occupation réelle ne compte que les identifiants distincts.",
      "1. Additionnez les couches de catalog-api. 2. Additionnez les tailles apparentes des trois images. 3. Listez les couches distinctes et additionnez-les. 4. Soustrayez le réel du brut. 5. Divisez l'économie par le brut et multipliez par 100."
    ],
    "examples": [
      {
        "stdin": "SuiviColis déploie : suivi-back (base:5, libs:80, code:10), suivi-worker (base:5, libs:80, code:6), suivi-front (base:5, static:15).\n\n1) suivi-back : 5 + 80 + 10 = 95 Mo.\n2) Brut : 95 + 91 + 20 = 206 Mo.\n3) Réel : 5 + 80 + 10 + 6 + 15 = 116 Mo.\n4) Économie : 206 − 116 = 90 Mo.\n5) Pourcentage : 90 / 206 × 100 = 43,7 %.",
        "expected": "95 Mo — 206 Mo bruts — 116 Mo réels — 90 Mo économisés — 43,7 %",
        "note": "Les couches de base et de dépendances, partagées, ne coûtent rien de plus pour la deuxième image."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille apparente de catalog-api en Mo",
        "stdin": "q:1",
        "expected": "143"
      },
      {
        "label": "Question 2 — Taille brute cumulée en Mo",
        "stdin": "q:2",
        "expected": "308"
      },
      {
        "label": "Question 3 — Place réellement occupée en Mo",
        "stdin": "q:3",
        "expected": "172"
      },
      {
        "label": "Question 4 — Économie réalisée en Mo",
        "stdin": "q:4",
        "expected": "136"
      },
      {
        "label": "Question 5 — Économie en % de la taille brute",
        "stdin": "q:5",
        "expected": "44,2||44.2||44,2%||44.2%"
      }
    ],
    "solution": "[Question 1 — Taille apparente de catalog-api en Mo]\n143\n\n[Question 2 — Taille brute cumulée en Mo]\n308\n\n[Question 3 — Place réellement occupée en Mo]\n172\n\n[Question 4 — Économie réalisée en Mo]\n136\n\n[Question 5 — Économie en % de la taille brute]\n44,2",
    "takeaway": "1) catalog-api : 8 + 120 + 15 = 143 Mo.\n2) Taille brute : 143 + (8 + 120 + 9) + (8 + 20) = 143 + 137 + 28 = 308 Mo.\n3) Couches distinctes : base_alpine 8 + node_modules 120 + code_api 15 + code_worker 9 + static_front 20 = 172 Mo.\n4) Économie : 308 − 172 = 136 Mo.\n5) Pourcentage : 136 / 308 × 100 = 44,2 %.\nContrôle : la couche base_alpine, comptée trois fois dans le brut (24 Mo), n'occupe que 8 Mo sur l'hôte ; node_modules passe de 240 Mo comptés à 120 Mo réels."
  },
  {
    "id": "do3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'ordre de démarrage du docker-compose de Meetup'Pro",
    "exampleTitle": "Exemple résolu — l'ordre de démarrage du compose PortailRh",
    "goal": "Résoudre l'ordre de démarrage d'une stack docker-compose à partir des dépendances depends_on et détecter les cycles bloquants.",
    "brief": "<p><strong>Énoncé.</strong> Meetup'Pro organise des événements professionnels. Sa stack tourne sous Docker Compose :</p><pre>services:\n  web:\n    image: nginx\n    depends_on: [api, assets]\n  api:\n    image: meetappro/api\n    depends_on: [db, cache]\n  worker:\n    image: meetappro/worker\n    depends_on: [db]\n  db:\n    image: postgres:16\n  cache:\n    image: redis:7\n  assets:\n    image: minio</pre><p>Un service ne démarre que lorsque tous les services listés dans son <code>depends_on</code> sont démarrés. Quand plusieurs services peuvent démarrer au même moment, on les ordonne par ordre alphabétique. Répondez aux questions 1, 2 et 3 en séparant les noms de services par des virgules.</p><ol><li>Quels services n'ont aucune dépendance ? (ordre alphabétique)</li><li>Quels services dépendent directement de db ? (ordre alphabétique)</li><li>Donnez l'ordre de démarrage complet des six services.</li><li>Le service worker peut-il démarrer avant cache ? (oui ou non)</li><li>Si A dépend de B et B dépend de A, Docker Compose signale-t-il une erreur ou un simple avertissement ?</li></ol>",
    "starter": "# Exercice — L'ordre de démarrage du docker-compose de Meetup'Pro\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Services sans dépendance]\nA_COMPLETER\n\n[Question 2 — Services dépendant directement de db]\nA_COMPLETER\n\n[Question 3 — Ordre de démarrage complet]\nA_COMPLETER\n\n[Question 4 — worker peut-il démarrer avant cache ?]\nA_COMPLETER\n\n[Question 5 — Réaction de Compose face à un cycle]\nA_COMPLETER\n",
    "hints": [
      "depends_on se lit dans l'autre sens : les services listés doivent être démarrés avant le service qui les nomme.",
      "Résolvez l'ordre par paliers : d'abord les services sans dépendance, puis ceux dont les dépendances viennent d'être satisfaites, et ainsi de suite.",
      "1. Listez les services dont le depends_on est vide. 2. Lisez le depends_on de chaque service pour trouver db. 3. Construisez les paliers puis triez chaque palier par ordre alphabétique. 4. Vérifiez si cache apparaît dans les dépendances de worker. 5. Une dépendance circulaire empêche tout démarrage : Compose la signale comme une erreur."
    ],
    "examples": [
      {
        "stdin": "PortailRh exécute :\n  portal: depends_on [auth, files]\n  auth: depends_on [db]\n  files: depends_on [db, cache]\n  db: aucune dépendance\n  cache: aucune dépendance\n\n1) Sans dépendance : cache, db.\n2) Dépendent directement de db : auth, files.\n3) Ordre : cache, db, auth, files, portal.\n4) files peut-il démarrer avant auth ? Oui, ils sont indépendants.\n5) Un cycle entre A et B provoque une erreur.",
        "expected": "cache, db — auth, files — cache, db, auth, files, portal — oui — erreur",
        "note": "Chaque palier regroupe les services devenus éligibles au même moment ; le tri alphabétique rend l'ordre déterministe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Services sans dépendance",
        "stdin": "q:1",
        "expected": "assets, cache, db||assets,cache,db"
      },
      {
        "label": "Question 2 — Services dépendant directement de db",
        "stdin": "q:2",
        "expected": "api, worker||api,worker"
      },
      {
        "label": "Question 3 — Ordre de démarrage complet",
        "stdin": "q:3",
        "expected": "assets, cache, db, api, worker, web||assets,cache,db,api,worker,web"
      },
      {
        "label": "Question 4 — worker peut-il démarrer avant cache ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Réaction de Compose face à un cycle",
        "stdin": "q:5",
        "expected": "erreur||une erreur"
      }
    ],
    "solution": "[Question 1 — Services sans dépendance]\nassets, cache, db\n\n[Question 2 — Services dépendant directement de db]\napi, worker\n\n[Question 3 — Ordre de démarrage complet]\nassets, cache, db, api, worker, web\n\n[Question 4 — worker peut-il démarrer avant cache ?]\noui\n\n[Question 5 — Réaction de Compose face à un cycle]\nerreur",
    "takeaway": "1) Les services sans depends_on sont assets, cache et db : assets, cache, db.\n2) api (depends_on db, cache) et worker (depends_on db) dépendent directement de db : api, worker.\n3) Palier 1 : assets, cache, db. Palier 2 : api (db et cache démarrés) et worker (db démarré) : api, worker. Palier 3 : web (api et assets démarrés). Ordre complet : assets, cache, db, api, worker, web.\n4) worker ne dépend que de db : il peut démarrer avant cache, réponse oui.\n5) Une dépendance circulaire entre A et B empêche tout démarrage : Docker Compose signale une erreur (cycle détecté).\nContrôle : dans l'ordre de la question 3, chaque service apparaît après tous les services qu'il nomme dans son depends_on."
  }
];
