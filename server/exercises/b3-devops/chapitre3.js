/**
 * Exercices du chapitre 3 — DevOps B3.
 * Conteneurisation Avancée, Dockerfile & Orchestration Compose.
 */
'use strict';

module.exports = [
  {
    id: 'do3-c3-e1',
    chapter: 3,
    title: 'Auditeur d’optimisation de Dockerfile (Layer Caching & Multi-Stage)',
    level: 'n1',
    language: 'python',
    goal: 'Détecter les anti-patterns courants dans la rédaction d’un Dockerfile et calculer son score de conformité aux bonnes pratiques de conteneurisation.',
    brief: '<p>Le script lit sur l\'entrée standard les lignes successives d\'un Dockerfile (format <code>INSTRUCTION argument...</code>) :<br><br>\nRègles d\'audit (score de départ : 100 points) :<br>\n1. <strong>Image de base lourde (-20 pts) :</strong> si une instruction <code>FROM</code> utilise une image complète (contient <code>python:</code>, <code>node:</code>, <code>golang:</code>, <code>ubuntu:</code>) SANS contenir <code>slim</code> ou <code>alpine</code> -&gt; alerte <code>BASE_IMAGE_VOLUMINEUSE</code>.<br>\n2. <strong>Invalidation prématurée du cache (-30 pts) :</strong> si une instruction <code>COPY . .</code> ou <code>COPY . /</code> apparaît chronologiquement <strong>avant</strong> une instruction d\'installation de dépendances (contenant <code>npm install</code> ou <code>pip install</code>) -&gt; alerte <code>CACHE_DEPENDANCES_INVALIDE</code>.<br>\n3. <strong>Absence de multi-stage pour le compilé (-30 pts) :</strong> si le Dockerfile contient une commande de compilation lourde (contenant <code>go build</code> ou <code>cargo build</code>) mais qu\'il n\'y a qu\'une seule instruction <code>FROM</code> dans tout le fichier -&gt; alerte <code>MULTI_STAGE_REQUIS</code>.<br>\n4. <strong>Exécution en compte root (-20 pts) :</strong> si aucune instruction <code>USER</code> n\'apparaît dans tout le fichier -&gt; alerte <code>EXECUTION_ROOT_DECONSEILLEE</code>.<br><br>\nScore minimal = 0.<br>\nQualification du score :<br>\n- 100 : <code>OPTIMAL</code><br>\n- $\\ge 60$ : <code>ACCEPTABLE</code><br>\n- $&lt; 60$ : <code>A_REFACTORISER</code><br><br>\nAfficher :<br>\n<code>AUDIT_DOCKERFILE: SCORE=&lt;score&gt;/100 | NIVEAU=&lt;NIVEAU&gt; | ALERTES=[&lt;alertes ou AUCUNE&gt;]</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le Dockerfile et détecter les anti-patterns
`,
    hints: [
      'Copier package.json ou requirements.txt avant COPY . . permet de réutiliser le cache Docker.',
      'Garder l’ordre officiel des 4 alertes ci-dessus.'
    ],
    examples: [
      {
        stdin: 'FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nUSER appuser\nCMD ["python", "main.py"]',
        expected: 'AUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]',
        note: 'Image slim, dépendances copiées avant le code complet, compte non-root : Dockerfile parfait.'
      }
    ],
    tests: [
      {
        label: 'Dockerfile naïf avec base lourde et cache invalidé',
        stdin: 'FROM python:3.11\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD ["python", "main.py"]',
        expected: 'AUDIT_DOCKERFILE: SCORE=30/100 | NIVEAU=A_REFACTORISER | ALERTES=[BASE_IMAGE_VOLUMINEUSE, CACHE_DEPENDANCES_INVALIDE, EXECUTION_ROOT_DECONSEILLEE]'
      },
      {
        label: 'Compilation Go sans étape multi-stage',
        stdin: 'FROM golang:1.20-alpine\nWORKDIR /src\nCOPY . .\nRUN go build -o app\nUSER nonroot\nCMD ["./app"]',
        expected: 'AUDIT_DOCKERFILE: SCORE=70/100 | NIVEAU=ACCEPTABLE | ALERTES=[MULTI_STAGE_REQUIS]'
      },
      {
        label: 'Multi-stage complet avec base alpine et utilisateur dédié',
        stdin: 'FROM golang:1.20-alpine AS builder\nCOPY . .\nRUN go build -o myapp\nFROM alpine:3.18\nCOPY --from=builder /myapp /myapp\nUSER 1000\nCMD ["/myapp"]',
        expected: 'AUDIT_DOCKERFILE: SCORE=100/100 | NIVEAU=OPTIMAL | ALERTES=[AUCUN]'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

score = 100
alertes = []

from_lines = [lig for lig in lignes if lig.startswith('FROM ')]
has_user = any(lig.startswith('USER ') for lig in lignes)
has_heavy_compile = any('go build' in lig or 'cargo build' in lig for lig in lignes)

# 1. Base lourde
is_heavy_base = False
for f in from_lines:
    parts = f.split()
    if len(parts) >= 2:
        img = parts[1]
        for heavy in ['python:', 'node:', 'golang:', 'ubuntu:']:
            if heavy in img and 'slim' not in img and 'alpine' not in img:
                is_heavy_base = True
                break
if is_heavy_base:
    score -= 20
    alertes.append('BASE_IMAGE_VOLUMINEUSE')

# 2. Invalidation cache
copy_all_idx = None
pkg_install_idx = None

for idx, lig in enumerate(lignes):
    if lig.startswith('COPY . .') or lig.startswith('COPY . /'):
        if copy_all_idx is None:
            copy_all_idx = idx
    if 'npm install' in lig or 'pip install' in lig:
        if pkg_install_idx is None:
            pkg_install_idx = idx

if copy_all_idx is not None and pkg_install_idx is not None and copy_all_idx < pkg_install_idx:
    score -= 30
    alertes.append('CACHE_DEPENDANCES_INVALIDE')

# 3. Multi-stage
if has_heavy_compile and len(from_lines) < 2:
    score -= 30
    alertes.append('MULTI_STAGE_REQUIS')

# 4. Root
if not has_user:
    score -= 20
    alertes.append('EXECUTION_ROOT_DECONSEILLEE')

score = max(0, score)
if score == 100:
    niveau = 'OPTIMAL'
elif score >= 60:
    niveau = 'ACCEPTABLE'
else:
    niveau = 'A_REFACTORISER'

alertes_str = 'AUCUN' if not alertes else ', '.join(alertes)
print(f"AUDIT_DOCKERFILE: SCORE={score}/100 | NIVEAU={niveau} | ALERTES=[{alertes_str}]")
`
  },
  {
    id: 'do3-c3-e2',
    chapter: 3,
    title: 'Calculateur d’empreinte disque des couches d’images partagées',
    level: 'n2',
    language: 'python',
    goal: 'Quantifier l’économie d’espace disque permise par le système de couches immuables (layer sharing) du démon Docker sur un hôte.',
    brief: '<p>Le script lit sur l\'entrée standard la composition en couches de plusieurs images :<br>\n<code>IMAGE nom=&lt;nom&gt; LAYERS=&lt;hash1:taille,hash2:taille,...&gt;</code>.<br>\nChaque couche possède un identifiant de hachage et une taille en Mo (ex: <code>L_base:120,L_node:80,L_app:15</code>).<br><br>\nPour chaque image :<br>\n- Calculer sa taille brute apparente = somme de ses couches.<br>\n- Afficher : <code>IMAGE: &lt;nom&gt; -&gt; TAILLE=&lt;taille&gt;Mo</code><br><br>\nPour l’ensemble du parc :<br>\n- <code>Brut_cumulé</code> = somme des tailles de toutes les images.<br>\n- <code>Réel_sur_hôte</code> = somme des tailles des couches <strong>uniques</strong> (chaque hash n\'est comptabilisé qu\'une seule fois sur le disque hôte).<br>\n- <code>Économie</code> = $Brut\\_cumulé - Réel\\_sur\\_hôte$<br>\n- Pourcentage = $(Économie / Brut\\_cumulé) \\times 100$<br><br>\nAfficher la synthèse :<br>\n<code>SYNTHESE_DOCKER: BRUT_CUMULE=&lt;brut&gt;Mo | REEL_SUR_HOTE=&lt;reel&gt;Mo | ECONOMIE=&lt;eco&gt;Mo (-&lt;pct:.1f&gt;%)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : dédoublonner les couches et calculer le gain d'espace
`,
    hints: [
      'Utiliser un dictionnaire pour mémoriser la taille associée à chaque hash de couche unique.',
      'Le partage de couches de base (ex: Ubuntu ou Alpine) réduit drastiquement l’empreinte des flottes de microservices.'
    ],
    examples: [
      {
        stdin: 'IMAGE nom=api_auth LAYERS=L_node:150,L_express:30,L_auth:10\nIMAGE nom=api_users LAYERS=L_node:150,L_express:30,L_users:15\nIMAGE nom=worker LAYERS=L_node:150,L_queues:40',
        expected: 'IMAGE: api_auth -> TAILLE=190Mo\nIMAGE: api_users -> TAILLE=195Mo\nIMAGE: worker -> TAILLE=190Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=575Mo | REEL_SUR_HOTE=245Mo | ECONOMIE=330Mo (-57.4%)',
        note: 'La couche L_node (150 Mo) et L_express (30 Mo) sont mutualisées sur l’hôte physique.'
      }
    ],
    tests: [
      {
        label: 'Deux images identiques sous des noms différents',
        stdin: 'IMAGE nom=service_v1 LAYERS=L1:100,L2:50\nIMAGE nom=service_v1_backup LAYERS=L1:100,L2:50',
        expected: 'IMAGE: service_v1 -> TAILLE=150Mo\nIMAGE: service_v1_backup -> TAILLE=150Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=150Mo | ECONOMIE=150Mo (-50.0%)'
      },
      {
        label: 'Images totalement disjointes sans partage',
        stdin: 'IMAGE nom=front_nginx LAYERS=LN:40,LA:10\nIMAGE nom=db_postgres LAYERS=LP:200,LD:50',
        expected: 'IMAGE: front_nginx -> TAILLE=50Mo\nIMAGE: db_postgres -> TAILLE=250Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=300Mo | REEL_SUR_HOTE=300Mo | ECONOMIE=0Mo (-0.0%)'
      },
      {
        label: 'Microservices avec couches partagées étagées',
        stdin: 'IMAGE nom=svc_a LAYERS=base:50,mid:30,code_a:10\nIMAGE nom=svc_b LAYERS=base:50,mid:30,code_b:12\nIMAGE nom=svc_c LAYERS=base:50,code_c:8',
        expected: 'IMAGE: svc_a -> TAILLE=90Mo\nIMAGE: svc_b -> TAILLE=92Mo\nIMAGE: svc_c -> TAILLE=58Mo\nSYNTHESE_DOCKER: BRUT_CUMULE=240Mo | REEL_SUR_HOTE=110Mo | ECONOMIE=130Mo (-54.2%)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

images = []
unique_layers = {}
tot_brut = 0

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?LAYERS=([^\\s]+)', lig)
    if not m:
        continue
    nom, l_str = m.group(1), m.group(2)
    img_size = 0
    for item in l_str.split(','):
        h, sz_str = item.split(':')
        sz = int(sz_str)
        img_size += sz
        unique_layers[h] = sz
        
    tot_brut += img_size
    print(f"IMAGE: {nom} -> TAILLE={img_size}Mo")

tot_reel = sum(unique_layers.values())
eco = tot_brut - tot_reel
pct = (eco / tot_brut) * 100.0 if tot_brut > 0 else 0.0

print(f"SYNTHESE_DOCKER: BRUT_CUMULE={tot_brut}Mo | REEL_SUR_HOTE={tot_reel}Mo | ECONOMIE={eco}Mo (-{pct:.1f}%)")
`
  },
  {
    id: 'do3-c3-e3',
    chapter: 3,
    title: 'Résolveur d’ordre de démarrage de services Docker Compose (depends_on)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la séquence de démarrage topologique valide d’un fichier docker-compose.yml en résolvant les dépendances et en détectant les cycles bloquants.',
    brief: '<p>Le script lit sur l\'entrée standard la liste des services et leurs dépendances :<br>\n<code>SERVICE nom=&lt;nom&gt; depends_on=&lt;s1,s2,...|NONE&gt;</code>.<br><br>\nRègles :<br>\n- Un service ne peut démarrer que lorsque TOUS les services mentionnés dans sa directive <code>depends_on</code> ont déjà démarré.<br>\n- Si plusieurs services sont éligibles à démarrer au même moment, les ordonner par <strong>ordre alphabétique</strong> de leur nom pour garantir un résultat déterministe.<br>\n- Si un cycle de dépendance mutuelle rend le démarrage impossible (ex: A dépend de B et B dépend de A) :<br>\n  <code>DOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE</code><br>\n- Sinon, afficher la séquence ordonnée :<br>\n  <code>DOCKER_COMPOSE: ORDRE_DEMARRAGE=[&lt;s1, s2, ...&gt;]</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : tri topologique et détection de cycle
`,
    hints: [
      'Utiliser l’algorithme de Kahn avec file de priorité ou sélection du minimum alphabétique parmi les degrés entrants nuls.',
      'Un service dépend de ses prérequis (ses prérequis doivent démarrer avant lui).'
    ],
    examples: [
      {
        stdin: 'SERVICE nom=web depends_on=api\nSERVICE nom=api depends_on=database,redis\nSERVICE nom=database depends_on=NONE\nSERVICE nom=redis depends_on=NONE',
        expected: 'DOCKER_COMPOSE: ORDRE_DEMARRAGE=[database, redis, api, web]',
        note: 'database et redis démarrent en premier (alphabétiquement database puis redis), puis api, puis web.'
      }
    ],
    tests: [
      {
        label: 'Cycle d’interblocage direct entre deux services',
        stdin: 'SERVICE nom=service_a depends_on=service_b\nSERVICE nom=service_b depends_on=service_a',
        expected: 'DOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE'
      },
      {
        label: 'Graphe en diamant classique web, front, cache, bdd',
        stdin: 'SERVICE nom=nginx depends_on=app1,app2\nSERVICE nom=app1 depends_on=db\nSERVICE nom=app2 depends_on=db\nSERVICE nom=db depends_on=NONE',
        expected: 'DOCKER_COMPOSE: ORDRE_DEMARRAGE=[db, app1, app2, nginx]'
      },
      {
        label: 'Services indépendants tous sans dépendances',
        stdin: 'SERVICE nom=worker_b depends_on=NONE\nSERVICE nom=worker_a depends_on=NONE\nSERVICE nom=worker_c depends_on=NONE',
        expected: 'DOCKER_COMPOSE: ORDRE_DEMARRAGE=[worker_a, worker_b, worker_c]'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

deps = {}  # service -> set(prerequis)
all_services = set()

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?depends_on=([^\\s]+)', lig)
    if not m:
        continue
    nom, d_str = m.group(1), m.group(2)
    all_services.add(nom)
    if d_str == 'NONE':
        deps[nom] = set()
    else:
        reqs = set(d_str.split(','))
        deps[nom] = reqs
        all_services.update(reqs)

# Algorithme de Kahn avec sélection déterministe
order = []
remaining = dict(deps)

while remaining:
    # Trouver tous les services dont les dépendances sont déjà satisfaites
    ready = [s for s, reqs in remaining.items() if reqs.issubset(order)]
    if not ready:
        print("DOCKER_COMPOSE: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE")
        sys.exit(0)
    ready.sort()
    chosen = ready[0]
    order.append(chosen)
    del remaining[chosen]

print(f"DOCKER_COMPOSE: ORDRE_DEMARRAGE=[{', '.join(order)}]")
`
  }
];
