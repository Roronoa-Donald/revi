'use strict';

module.exports = [
  {
    "id": "dk2-c5-e1",
    "chapter": 5,
    "title": "Parseur et validateur de services Docker Compose",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la structure des déclarations de services dans une spécification Docker Compose.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles de validation :<br>\n1. Chaque service DOIT comporter au moins une directive <code>image</code> OU <code>build</code>.<br>\n2. La directive <code>restart</code>, si présente, doit être parmi : <code>no</code>, <code>always</code>, <code>unless-stopped</code>, <code>on-failure</code>. (Sinon <code>no</code> par défaut).<br>\nPour chaque service :<br>\n- Si valide : <code>SERVICE: &lt;Nom&gt; -&gt; VALIDE [Origine: &lt;ImageOuBuild&gt; | Ports: &lt;PortsOuAucun&gt; | Restart: &lt;Restart&gt;]</code><br>\n- Si ni image ni build n'est défini : <code>SERVICE: &lt;Nom&gt; -&gt; INVALIDE (Directive image ou build obligatoire)</code></p>",
    "starter": "# Grille d'analyse (dk2-c5-e1) — Parseur et validateur de services Docker Compose\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Service avec directive build]\n# Données : service: backend | build: ./api | ports: 3000:3000\nA_COMPLETER\n\n[Cas 2 — Restart invalide ramené au défaut no]\n# Données : service: db | image: postgres:15 | restart: infinite\nA_COMPLETER\n\n[Cas 3 — Plusieurs services complets]\n# Données : service: web | image: httpd:2.4 | ports: 8080:80\n# Données : service: bad | ports: 5000:5000\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "SERVICE: backend -> VALIDE [Origine: build:./api | Ports: 3000:3000 | Restart: no]"
      },
      {
        "label": "Restart invalide ramené au défaut no",
        "stdin": "cas:2",
        "expected": "SERVICE: db -> VALIDE [Origine: image:postgres:15 | Ports: aucun | Restart: no]"
      },
      {
        "label": "Plusieurs services complets",
        "stdin": "cas:3",
        "expected": "SERVICE: web -> VALIDE [Origine: image:httpd:2.4 | Ports: 8080:80 | Restart: no]\nSERVICE: bad -> INVALIDE (Directive image ou build obligatoire)"
      }
    ],
    "solution": "[Exemple]\nSERVICE: frontend -> VALIDE [Origine: image:nginx:alpine | Ports: 80:80 | Restart: always]\nSERVICE: cache -> VALIDE [Origine: image:redis:7 | Ports: aucun | Restart: unless-stopped]\nSERVICE: orphelin -> INVALIDE (Directive image ou build obligatoire)\n\n[Cas 1 — Service avec directive build]\nSERVICE: backend -> VALIDE [Origine: build:./api | Ports: 3000:3000 | Restart: no]\n\n[Cas 2 — Restart invalide ramené au défaut no]\nSERVICE: db -> VALIDE [Origine: image:postgres:15 | Ports: aucun | Restart: no]\n\n[Cas 3 — Plusieurs services complets]\nSERVICE: web -> VALIDE [Origine: image:httpd:2.4 | Ports: 8080:80 | Restart: no]\nSERVICE: bad -> INVALIDE (Directive image ou build obligatoire)"
  },
  {
    "id": "dk2-c5-e2",
    "chapter": 5,
    "title": "Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer l’ordre d’instanciation séquentiel des conteneurs via un tri topologique sans cycle.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas... ou NONE&gt;</code>.<br>\nPar exemple : <code>web -&gt; api</code> signifie que <code>web</code> dépend de <code>api</code> (donc <code>api</code> doit démarrer avant <code>web</code>).<br>\nRègles :<br>\n- Effectuer un tri topologique des services.<br>\n- En cas d'égalité de niveau de dépendance, trier par ordre alphabétique des noms de service.<br>\n- Si une boucle de dépendance mutuelle est détectée, afficher : <code>ERREUR_COMPOSE: Dependance cyclique detectee</code>.<br>\n- Sinon, afficher l'ordre strict de démarrage :<br>\n<code>ORDRE_DEMARRAGE: &lt;S1&gt; -&gt; &lt;S2&gt; -&gt; ...</code></p>",
    "starter": "# Grille d'analyse (dk2-c5-e2) — Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois services indépendants sans dépendance]\n# Données : svc_c -> NONE\n# Données : svc_a -> NONE\n# Données : svc_b -> NONE\nA_COMPLETER\n\n[Cas 2 — Dépendance circulaire bloquante]\n# Données : svc1 -> svc2\n# Données : svc2 -> svc1\nA_COMPLETER\n\n[Cas 3 — Graphe complexe avec worker]\n# Données : front -> api\n# Données : worker -> queue, db\n# Données : queue -> NONE\n# Données : db -> NONE\n# Données : api -> db\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "ORDRE_DEMARRAGE: svc_a -> svc_b -> svc_c"
      },
      {
        "label": "Dépendance circulaire bloquante",
        "stdin": "cas:2",
        "expected": "ERREUR_COMPOSE: Dependance cyclique detectee"
      },
      {
        "label": "Graphe complexe avec worker",
        "stdin": "cas:3",
        "expected": "ORDRE_DEMARRAGE: db -> api -> front -> queue -> worker"
      }
    ],
    "solution": "[Exemple]\nORDRE_DEMARRAGE: db -> redis -> api -> web\n\n[Cas 1 — Trois services indépendants sans dépendance]\nORDRE_DEMARRAGE: svc_a -> svc_b -> svc_c\n\n[Cas 2 — Dépendance circulaire bloquante]\nERREUR_COMPOSE: Dependance cyclique detectee\n\n[Cas 3 — Graphe complexe avec worker]\nORDRE_DEMARRAGE: db -> api -> front -> queue -> worker"
  },
  {
    "id": "dk2-c5-e3",
    "chapter": 5,
    "title": "Interprète de variables d’environnement et fichiers .env dans Compose",
    "level": "n3",
    "language": "analyse",
    "goal": "Résoudre les syntaxes d’interpolation ${VAR} et ${VAR:-default} dans les fichiers de configuration Compose.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.env</code>.<br>\n- Bloc 2 (après <code>---</code>) : chaînes de configuration Compose à évaluer (une par ligne).<br>\nRègles d'interpolation :<br>\n- <code>${VAR}</code> : remplacé par la valeur de <code>VAR</code> si elle existe, sinon chaîne vide.<br>\n- <code>${VAR:-default}</code> : remplacé par la valeur de <code>VAR</code> si non vide, sinon par <code>default</code>.<br>\nPour chaque chaîne du bloc 2, afficher :<br>\n<code>RESOLU: &lt;ChaineApresInterpolation&gt;</code></p>",
    "starter": "# Grille d'analyse (dk2-c5-e3) — Interprète de variables d’environnement et fichiers .env dans Compose\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Variables simples existantes]\n# Données : APP_ENV=production\n# Données : APP_NAME=ecommerce\n# Données : ---\n# Données : environment: NODE_ENV=${APP_ENV}\n# Données : container_name: ${APP_NAME}_app\nA_COMPLETER\n\n[Cas 2 — Variable absente sans valeur par défaut]\n# Données : AUTRE=test\n# Données : ---\n# Données : prefix_${INCONNU}_suffix\nA_COMPLETER\n\n[Cas 3 — Multiples interpolations sur la même ligne]\n# Données : HOST=localhost\n# Données : PORT=3306\n# Données : ---\n# Données : DATABASE_URL=mysql://${HOST}:${PORT}/mydb\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "RESOLU: environment: NODE_ENV=production\nRESOLU: container_name: ecommerce_app"
      },
      {
        "label": "Variable absente sans valeur par défaut",
        "stdin": "cas:2",
        "expected": "RESOLU: prefix__suffix"
      },
      {
        "label": "Multiples interpolations sur la même ligne",
        "stdin": "cas:3",
        "expected": "RESOLU: DATABASE_URL=mysql://localhost:3306/mydb"
      }
    ],
    "solution": "[Exemple]\nRESOLU: image: nginx:latest\nRESOLU: ports: 8080:80\nRESOLU: user: admin\nRESOLU: db_pass: secret123\n\n[Cas 1 — Variables simples existantes]\nRESOLU: environment: NODE_ENV=production\nRESOLU: container_name: ecommerce_app\n\n[Cas 2 — Variable absente sans valeur par défaut]\nRESOLU: prefix__suffix\n\n[Cas 3 — Multiples interpolations sur la même ligne]\nRESOLU: DATABASE_URL=mysql://localhost:3306/mydb"
  }
];
