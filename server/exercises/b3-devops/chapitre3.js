'use strict';

module.exports = [
  {
    "id": "do3-c3-e1",
    "chapter": 3,
    "title": "Auditeur d’optimisation de Dockerfile (Layer Caching & Multi-Stage)",
    "level": "n1",
    "language": "analyse",
    "goal": "Détecter les anti-patterns courants dans la rédaction d’un Dockerfile et calculer son score de conformité aux bonnes pratiques de conteneurisation.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...</code>) :<br><br>\nRègles d'audit (score de départ : 100 points) :<br>\n1. <strong>Image de base lourde (-20 pts) :</strong> si une instruction <code>FROM</code> utilise une image complète (contient <code>python:</code>, <code>node:</code>, <code>golang:</code>, <code>ubuntu:</code>) SANS contenir <code>slim</code> ou <code>alpine</code> -&gt; alerte <code>BASE_IMAGE_VOLUMINEUSE</code>.<br>\n2. <strong>Invalidation prématurée du cache (-30 pts) :</strong> si une instruction <code>COPY . .</code> ou <code>COPY . /</code> apparaît chronologiquement <strong>avant</strong> une instruction d'installation de dépendances (contenant <code>npm install</code> ou <code>pip install</code>) -&gt; alerte <code>CACHE_DEPENDANCES_INVALIDE</code>.<br>\n3. <strong>Absence de multi-stage pour le compilé (-30 pts) :</strong> si le Dockerfile contient une commande de compilation lourde (contenant <code>go build</code> ou <code>cargo build</code>) mais qu'il n'y a qu'une seule instruction <code>FROM</code> dans tout le fichier -&gt; alerte <code>MULTI_STAGE_REQUIS</code>.<br>\n4. <strong>Exécution en compte root (-20 pts) :</strong> si aucune instruction <code>USER</code> n'apparaît dans tout le fichier -&gt; alerte <code>EXECUTION_ROOT_DECONSEILLEE</code>.<br><br>\nScore minimal = 0.<br>\nQualification du score :<br>\n- 100 : <code>OPTIMAL</code><br>\n- $\\ge 60$ : <code>ACCEPTABLE</code><br>\n- $&lt; 60$ : <code>A_REFACTORISER</code><br><br>\nAfficher :<br>\n<code>AUDIT_DOCKERFILE: SCORE=&lt;score&gt;/100 | NIVEAU=&lt;NIVEAU&gt; | ALERTES=[&lt;alertes ou AUCUNE&gt;]</code></p>",
    "starter": "# Grille d'analyse (do3-c3-e1) — Auditeur d’optimisation de Dockerfile (Layer Caching & Multi-Stage)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dockerfile naïf avec base lourde et cache invalidé]\n# Données : FROM python:3.11\n# Données : WORKDIR /app\n# Données : COPY . .\n# Données : RUN pip install -r requirements.txt\n# Données : CMD [\"python\", \"main.py\"]\nA_COMPLETER\n\n[Cas 2 — Compilation Go sans étape multi-stage]\n# Données : FROM golang:1.20-alpine\n# Données : WORKDIR /src\n# Données : COPY . .\n# Données : RUN go build -o app\n# Données : USER nonroot\n# Données : CMD [\"./app\"]\nA_COMPLETER\n\n[Cas 3 — Multi-stage complet avec base alpine et utilisateur dédié]\n# Données : FROM golang:1.20-alpine AS builder\n# Données : COPY . .\n# Données : RUN go build -o myapp\n# Données : FROM alpine:3.18\n# Données : COPY --from=builder /myapp /myapp\n# Données : USER 1000\n# Données : CMD [\"/myapp\"]\nA_COMPLETER\n",
    "hints": [
      "Copier package.json ou requirements.txt avant COPY . . permet de réutiliser le cache Docker.",
      "Garder l’ordre officiel des 4 alertes ci-dessus."
    ],
    "examples": [
      {
        "stdin": "FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nUSER appuser\nCMD [\"python\", \"main.py\"]",
        "expected": "AUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]",
        "note": "Image slim, dépendances copiées avant le code complet, compte non-root : Dockerfile parfait."
      }
    ],
    "tests": [
      {
        "label": "Dockerfile naïf avec base lourde et cache invalidé",
        "stdin": "cas:1",
        "expected": "AUDIT_DOCKERFILE: SCORE=30/100 | NIVEAU=A_REFACTORISER | ALERTES=[BASE_IMAGE_VOLUMINEUSE, CACHE_DEPENDANCES_INVALIDE, EXECUTION_ROOT_DECONSEILLEE]"
      },
      {
        "label": "Compilation Go sans étape multi-stage",
        "stdin": "cas:2",
        "expected": "AUDIT_DOCKERFILE: SCORE=70/100 | NIVEAU=ACCEPTABLE | ALERTES=[MULTI_STAGE_REQUIS]"
      },
      {
        "label": "Multi-stage complet avec base alpine et utilisateur dédié",
        "stdin": "cas:3",
        "expected": "AUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]"
      }
    ],
    "solution": "[Exemple]\nAUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]\n\n[Cas 1 — Dockerfile naïf avec base lourde et cache invalidé]\nAUDIT_DOCKERFILE: SCORE=30/100 | NIVEAU=A_REFACTORISER | ALERTES=[BASE_IMAGE_VOLUMINEUSE, CACHE_DEPENDANCES_INVALIDE, EXECUTION_ROOT_DECONSEILLEE]\n\n[Cas 2 — Compilation Go sans étape multi-stage]\nAUDIT_DOCKERFILE: SCORE=70/100 | NIVEAU=ACCEPTABLE | ALERTES=[MULTI_STAGE_REQUIS]\n\n[Cas 3 — Multi-stage complet avec base alpine et utilisateur dédié]\nAUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]"
  },
  {
    "id": "do3-c3-e2",
    "chapter": 3,
    "title": "Calculateur d’empreinte disque des couches d’images partagées",
    "level": "n2",
    "language": "analyse",
    "goal": "Quantifier l’économie d’espace disque permise par le système de couches immuables (layer sharing) du démon Docker sur un hôte.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...&gt;</code>.<br>\nChaque couche possède un identifiant de hachage et une taille en Mo (ex: <code>L_base:120,L_node:80,L_app:15</code>).<br><br>\nPour chaque image :<br>\n- Calculer sa taille brute apparente = somme de ses couches.<br>\n- Afficher : <code>IMAGE: &lt;nom&gt; -&gt; TAILLE=&lt;taille&gt;Mo</code><br><br>\nPour l’ensemble du parc :<br>\n- <code>Brut_cumulé</code> = somme des tailles de toutes les images.<br>\n- <code>Réel_sur_hôte</code> = somme des tailles des couches <strong>uniques</strong> (chaque hash n'est comptabilisé qu'une seule fois sur le disque hôte).<br>\n- <code>Économie</code> = $Brut\\_cumulé - Réel\\_sur\\_hôte$<br>\n- Pourcentage = $(Économie / Brut\\_cumulé) \\times 100$<br><br>\nAfficher la synthèse :<br>\n<code>SYNTHESE_DOCKER: BRUT_CUMULE=&lt;brut&gt;Mo | REEL_SUR_HOTE=&lt;reel&gt;Mo | ECONOMIE=&lt;eco&gt;Mo (-&lt;pct:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (do3-c3-e2) — Calculateur d’empreinte disque des couches d’images partagées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux images identiques sous des noms différents]\n# Données : IMAGE nom=service_v1 LAYERS=L1:100,L2:50\n# Données : IMAGE nom=service_v1_backup LAYERS=L1:100,L2:50\nA_COMPLETER\n\n[Cas 2 — Images totalement disjointes sans partage]\n# Données : IMAGE nom=front_nginx LAYERS=LN:40,LA:10\n# Données : IMAGE nom=db_postgres LAYERS=LP:200,LD:50\nA_COMPLETER\n\n[Cas 3 — Microservices avec couches partagées étagées]\n# Données : IMAGE nom=svc_a LAYERS=base:50,mid:30,code_a:10\n# Données : IMAGE nom=svc_b LAYERS=base:50,mid:30,code_b:12\n# Données : IMAGE nom=svc_c LAYERS=base:50,code_c:8\nA_COMPLETER\n",
    "hints": [
      "Utiliser un dictionnaire pour mémoriser la taille associée à chaque hash de couche unique.",
      "Le partage de couches de base (ex: Ubuntu ou Alpine) réduit drastiquement l’empreinte des flottes de microservices."
    ],
    "examples": [
      {
        "stdin": "IMAGE nom=api_auth LAYERS=L_node:150,L_express:30,L_auth:10\nIMAGE nom=api_users LAYERS=L_node:150,L_express:30,L_users:15\nIMAGE nom=worker LAYERS=L_node:150,L_queues:40",
        "expected": "IMAGE: api_auth -> TAILLE=190Mo\nIMAGE: api_users -> TAILLE=195Mo\nIMAGE: worker -> TAILLE=190Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=575Mo | REEL_SUR_HOTE=245Mo | ECONOMIE=330Mo (-57.4%)",
        "note": "La couche L_node (150 Mo) et L_express (30 Mo) sont mutualisées sur l’hôte physique."
      }
    ],
    "tests": [
      {
        "label": "Deux images identiques sous des noms différents",
        "stdin": "cas:1",
        "expected": "IMAGE: service_v1 -> TAILLE=150Mo\nIMAGE: service_v1_backup -> TAILLE=150Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=150Mo | ECONOMIE=150Mo (-50.0%)"
      },
      {
        "label": "Images totalement disjointes sans partage",
        "stdin": "cas:2",
        "expected": "IMAGE: front_nginx -> TAILLE=50Mo\nIMAGE: db_postgres -> TAILLE=250Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=300Mo | ECONOMIE=0Mo (-0.0%)"
      },
      {
        "label": "Microservices avec couches partagées étagées",
        "stdin": "cas:3",
        "expected": "IMAGE: svc_a -> TAILLE=90Mo\nIMAGE: svc_b -> TAILLE=92Mo\nIMAGE: svc_c -> TAILLE=58Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=240Mo | REEL_SUR_HOTE=110Mo | ECONOMIE=130Mo (-54.2%)"
      }
    ],
    "solution": "[Exemple]\nIMAGE: api_auth -> TAILLE=190Mo\nIMAGE: api_users -> TAILLE=195Mo\nIMAGE: worker -> TAILLE=190Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=575Mo | REEL_SUR_HOTE=245Mo | ECONOMIE=330Mo (-57.4%)\n\n[Cas 1 — Deux images identiques sous des noms différents]\nIMAGE: service_v1 -> TAILLE=150Mo\nIMAGE: service_v1_backup -> TAILLE=150Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=150Mo | ECONOMIE=150Mo (-50.0%)\n\n[Cas 2 — Images totalement disjointes sans partage]\nIMAGE: front_nginx -> TAILLE=50Mo\nIMAGE: db_postgres -> TAILLE=250Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=300Mo | ECONOMIE=0Mo (-0.0%)\n\n[Cas 3 — Microservices avec couches partagées étagées]\nIMAGE: svc_a -> TAILLE=90Mo\nIMAGE: svc_b -> TAILLE=92Mo\nIMAGE: svc_c -> TAILLE=58Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=240Mo | REEL_SUR_HOTE=110Mo | ECONOMIE=130Mo (-54.2%)"
  },
  {
    "id": "do3-c3-e3",
    "chapter": 3,
    "title": "Résolveur d’ordre de démarrage de services Docker Compose (depends_on)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la séquence de démarrage topologique valide d’un fichier docker-compose.yml en résolvant les dépendances et en détectant les cycles bloquants.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...|NONE&gt;</code>.<br><br>\nRègles :<br>\n- Un service ne peut démarrer que lorsque TOUS les services mentionnés dans sa directive <code>depends_on</code> ont déjà démarré.<br>\n- Si plusieurs services sont éligibles à démarrer au même moment, les ordonner par <strong>ordre alphabétique</strong> de leur nom pour garantir un résultat déterministe.<br>\n- Si un cycle de dépendance mutuelle rend le démarrage impossible (ex: A dépend de B et B dépend de A) :<br>\n  <code>DOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE</code><br>\n- Sinon, afficher la séquence ordonnée :<br>\n  <code>DOCKER_COMPOSE: ORDRE_DEMARRAGE=[&lt;s1, s2, ...&gt;]</code></p>",
    "starter": "# Grille d'analyse (do3-c3-e3) — Résolveur d’ordre de démarrage de services Docker Compose (depends_on)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cycle d’interblocage direct entre deux services]\n# Données : SERVICE nom=service_a depends_on=service_b\n# Données : SERVICE nom=service_b depends_on=service_a\nA_COMPLETER\n\n[Cas 2 — Graphe en diamant classique web, front, cache, bdd]\n# Données : SERVICE nom=nginx depends_on=app1,app2\n# Données : SERVICE nom=app1 depends_on=db\n# Données : SERVICE nom=app2 depends_on=db\n# Données : SERVICE nom=db depends_on=NONE\nA_COMPLETER\n\n[Cas 3 — Services indépendants tous sans dépendances]\n# Données : SERVICE nom=worker_b depends_on=NONE\n# Données : SERVICE nom=worker_a depends_on=NONE\n# Données : SERVICE nom=worker_c depends_on=NONE\nA_COMPLETER\n",
    "hints": [
      "Utiliser l’algorithme de Kahn avec file de priorité ou sélection du minimum alphabétique parmi les degrés entrants nuls.",
      "Un service dépend de ses prérequis (ses prérequis doivent démarrer avant lui)."
    ],
    "examples": [
      {
        "stdin": "SERVICE nom=web depends_on=api\nSERVICE nom=api depends_on=database,redis\nSERVICE nom=database depends_on=NONE\nSERVICE nom=redis depends_on=NONE",
        "expected": "DOCKER_COMPOSE: ORDRE_DEMARRAGE=[database, redis, api, web]",
        "note": "database et redis démarrent en premier (alphabétiquement database puis redis), puis api, puis web."
      }
    ],
    "tests": [
      {
        "label": "Cycle d’interblocage direct entre deux services",
        "stdin": "cas:1",
        "expected": "DOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE"
      },
      {
        "label": "Graphe en diamant classique web, front, cache, bdd",
        "stdin": "cas:2",
        "expected": "DOCKER_COMPOSE: ORDRE_DEMARRAGE=[db, app1, app2, nginx]"
      },
      {
        "label": "Services indépendants tous sans dépendances",
        "stdin": "cas:3",
        "expected": "DOCKER_COMPOSE: ORDRE_DEMARRAGE=[worker_a, worker_b, worker_c]"
      }
    ],
    "solution": "[Exemple]\nDOCKER_COMPOSE: ORDRE_DEMARRAGE=[database, redis, api, web]\n\n[Cas 1 — Cycle d’interblocage direct entre deux services]\nDOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE\n\n[Cas 2 — Graphe en diamant classique web, front, cache, bdd]\nDOCKER_COMPOSE: ORDRE_DEMARRAGE=[db, app1, app2, nginx]\n\n[Cas 3 — Services indépendants tous sans dépendances]\nDOCKER_COMPOSE: ORDRE_DEMARRAGE=[worker_a, worker_b, worker_c]"
  }
];
