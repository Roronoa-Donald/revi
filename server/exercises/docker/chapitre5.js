/**
 * Exercices du chapitre 5 — Docker B2.
 * Orchestration avec Docker Compose.
 */
'use strict';

module.exports = [
  {
    id: 'dk2-c5-e1',
    chapter: 5,
    title: 'Parseur et validateur de services Docker Compose',
    level: 'n1',
    language: 'python',
    goal: 'Valider la structure des déclarations de services dans une spécification Docker Compose.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de services au format plat <code>service: &lt;Nom&gt; | image: &lt;Img&gt; | ports: &lt;P&gt; | restart: &lt;R&gt;</code>.<br>\nRègles de validation :<br>\n1. Chaque service DOIT comporter au moins une directive <code>image</code> OU <code>build</code>.<br>\n2. La directive <code>restart</code>, si présente, doit être parmi : <code>no</code>, <code>always</code>, <code>unless-stopped</code>, <code>on-failure</code>. (Sinon <code>no</code> par défaut).<br>\nPour chaque service :<br>\n- Si valide : <code>SERVICE: &lt;Nom&gt; -&gt; VALIDE [Origine: &lt;ImageOuBuild&gt; | Ports: &lt;PortsOuAucun&gt; | Restart: &lt;Restart&gt;]</code><br>\n- Si ni image ni build n\'est défini : <code>SERVICE: &lt;Nom&gt; -&gt; INVALIDE (Directive image ou build obligatoire)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider chaque service Compose
`,
    hints: [
      'Découper chaque ligne par le caractère pipe |.',
      'Extraire les paires cle: valeur.'
    ],
    examples: [
      {
        stdin: 'service: frontend | image: nginx:alpine | ports: 80:80 | restart: always\nservice: cache | image: redis:7 | restart: unless-stopped\nservice: orphelin | restart: always',
        expected: 'SERVICE: frontend -> VALIDE [Origine: image:nginx:alpine | Ports: 80:80 | Restart: always]\nSERVICE: cache -> VALIDE [Origine: image:redis:7 | Ports: aucun | Restart: unless-stopped]\nSERVICE: orphelin -> INVALIDE (Directive image ou build obligatoire)',
        note: 'Validation des directives requises de la spécification Compose.'
      }
    ],
    tests: [
      {
        label: 'Service avec directive build',
        stdin: 'service: backend | build: ./api | ports: 3000:3000',
        expected: 'SERVICE: backend -> VALIDE [Origine: build:./api | Ports: 3000:3000 | Restart: no]'
      },
      {
        label: 'Restart invalide ramené au défaut no',
        stdin: 'service: db | image: postgres:15 | restart: infinite',
        expected: 'SERVICE: db -> VALIDE [Origine: image:postgres:15 | Ports: aucun | Restart: no]'
      },
      {
        label: 'Plusieurs services complets',
        stdin: 'service: web | image: httpd:2.4 | ports: 8080:80\nservice: bad | ports: 5000:5000',
        expected: 'SERVICE: web -> VALIDE [Origine: image:httpd:2.4 | Ports: 8080:80 | Restart: no]\nSERVICE: bad -> INVALIDE (Directive image ou build obligatoire)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    morceaux = [m.strip() for m in l.split('|') if m.strip()]
    props = {}
    for m in morceaux:
        if ':' in m:
            k, v = m.split(':', 1)
            props[k.strip()] = v.strip()

    nom = props.get('service', 'inconnu')
    img = props.get('image', None)
    bld = props.get('build', None)
    pts = props.get('ports', 'aucun')
    rst = props.get('restart', 'no')

    if rst not in ('no', 'always', 'unless-stopped', 'on-failure'):
        rst = 'no'

    if not img and not bld:
        print(f"SERVICE: {nom} -> INVALIDE (Directive image ou build obligatoire)")
    else:
        orig = f"image:{img}" if img else f"build:{bld}"
        print(f"SERVICE: {nom} -> VALIDE [Origine: {orig} | Ports: {pts} | Restart: {rst}]")
`
  },
  {
    id: 'dk2-c5-e2',
    chapter: 5,
    title: 'Résolveur d’ordre de démarrage par graphe de dépendances (depends_on)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer l’ordre d’instanciation séquentiel des conteneurs via un tri topologique sans cycle.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de dépendances Compose au format <code>&lt;Service&gt; -&gt; &lt;Dep1, Dep2, ... ou NONE&gt;</code>.<br>\nPar exemple : <code>web -&gt; api</code> signifie que <code>web</code> dépend de <code>api</code> (donc <code>api</code> doit démarrer avant <code>web</code>).<br>\nRègles :<br>\n- Effectuer un tri topologique des services.<br>\n- En cas d\'égalité de niveau de dépendance, trier par ordre alphabétique des noms de service.<br>\n- Si une boucle de dépendance mutuelle est détectée, afficher : <code>ERREUR_COMPOSE: Dependance cyclique detectee</code>.<br>\n- Sinon, afficher l\'ordre strict de démarrage :<br>\n<code>ORDRE_DEMARRAGE: &lt;S1&gt; -&gt; &lt;S2&gt; -&gt; ...</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : résoudre le graphe de dépendances depends_on
`,
    hints: [
      'Construire la liste d’adjacence et les degrés entrants.',
      'Un service avec 0 dépendance restante peut démarrer immédiatement.'
    ],
    examples: [
      {
        stdin: 'web -> api\napi -> db, redis\ndb -> NONE\nredis -> NONE',
        expected: 'ORDRE_DEMARRAGE: db -> redis -> api -> web',
        note: 'db et redis démarrent en premier, puis api, puis web.'
      }
    ],
    tests: [
      {
        label: 'Trois services indépendants sans dépendance',
        stdin: 'svc_c -> NONE\nsvc_a -> NONE\nsvc_b -> NONE',
        expected: 'ORDRE_DEMARRAGE: svc_a -> svc_b -> svc_c'
      },
      {
        label: 'Dépendance circulaire bloquante',
        stdin: 'svc1 -> svc2\nsvc2 -> svc1',
        expected: 'ERREUR_COMPOSE: Dependance cyclique detectee'
      },
      {
        label: 'Graphe complexe avec worker',
        stdin: 'front -> api\nworker -> queue, db\nqueue -> NONE\ndb -> NONE\napi -> db',
        expected: 'ORDRE_DEMARRAGE: db -> api -> front -> queue -> worker'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

deps = {}
all_services = set()

for l in lignes:
    if '->' not in l:
        continue
    parties = l.split('->', 1)
    svc = parties[0].strip()
    dep_str = parties[1].strip()
    all_services.add(svc)
    if dep_str.upper() == 'NONE' or not dep_str:
        deps[svc] = set()
    else:
        d_list = [d.strip() for d in dep_str.split(',') if d.strip()]
        deps[svc] = set(d_list)
        for d in d_list:
            all_services.add(d)

for s in all_services:
    if s not in deps:
        deps[s] = set()

demarres = []
restants = dict(deps)

while restants:
    candidats = [s for s, reqs in restants.items() if len(reqs) == 0]
    if not candidats:
        print("ERREUR_COMPOSE: Dependance cyclique detectee")
        sys.exit(0)
    candidats.sort()
    choisi = candidats[0]
    demarres.append(choisi)
    del restants[choisi]
    for s in restants:
        restants[s].discard(choisi)

print("ORDRE_DEMARRAGE: " + " -> ".join(demarres))
`
  },
  {
    id: 'dk2-c5-e3',
    chapter: 5,
    title: 'Interprète de variables d’environnement et fichiers .env dans Compose',
    level: 'n3',
    language: 'python',
    goal: 'Résoudre les syntaxes d’interpolation ${VAR} et ${VAR:-default} dans les fichiers de configuration Compose.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Bloc 1 (jusqu\'à la ligne contenant <code>---</code>) : paires <code>CLE=VALEUR</code> définies dans le fichier <code>.env</code>.<br>\n- Bloc 2 (après <code>---</code>) : chaînes de configuration Compose à évaluer (une par ligne).<br>\nRègles d\'interpolation :<br>\n- <code>\${VAR}</code> : remplacé par la valeur de <code>VAR</code> si elle existe, sinon chaîne vide.<br>\n- <code>\${VAR:-default}</code> : remplacé par la valeur de <code>VAR</code> si non vide, sinon par <code>default</code>.<br>\nPour chaque chaîne du bloc 2, afficher :<br>\n<code>RESOLU: &lt;ChaineApresInterpolation&gt;</code></p>',
    starter: `import sys

contenu = sys.stdin.read()

# À compléter : interpoler les variables .env dans les expressions Compose
`,
    hints: [
      'Gérer les expressions régulières ou le parcours caractère par caractère pour repérer ${...}.',
      'Séparer proprement le bloc .env du bloc Compose via le délimiteur ---.'
    ],
    examples: [
      {
        stdin: 'PORT=8080\nDB_USER=admin\n---\nimage: nginx:${TAG:-latest}\nports: ${PORT}:80\nuser: ${DB_USER}\ndb_pass: ${DB_PASS:-secret123}',
        expected: 'RESOLU: image: nginx:latest\nRESOLU: ports: 8080:80\nRESOLU: user: admin\nRESOLU: db_pass: secret123',
        note: 'TAG prend la valeur latest par défaut, PORT et DB_USER sont interpolés.'
      }
    ],
    tests: [
      {
        label: 'Variables simples existantes',
        stdin: 'APP_ENV=production\nAPP_NAME=ecommerce\n---\nenvironment: NODE_ENV=${APP_ENV}\ncontainer_name: ${APP_NAME}_app',
        expected: 'RESOLU: environment: NODE_ENV=production\nRESOLU: container_name: ecommerce_app'
      },
      {
        label: 'Variable absente sans valeur par défaut',
        stdin: 'AUTRE=test\n---\nprefix_${INCONNU}_suffix',
        expected: 'RESOLU: prefix__suffix'
      },
      {
        label: 'Multiples interpolations sur la même ligne',
        stdin: 'HOST=localhost\nPORT=3306\n---\nDATABASE_URL=mysql://${HOST}:${PORT}/mydb',
        expected: 'RESOLU: DATABASE_URL=mysql://localhost:3306/mydb'
      }
    ],
    solution: `import sys
import re

contenu = sys.stdin.read()
if '---' not in contenu:
    sys.exit(0)

part_env, part_compose = contenu.split('---', 1)

env = {}
for l in part_env.splitlines():
    l = l.strip()
    if l and not l.startswith('#') and '=' in l:
        k, v = l.split('=', 1)
        env[k.strip()] = v.strip()

def remplacer_var(match):
    corps = match.group(1)
    if ':-' in corps:
        var_nom, defaut = corps.split(':-', 1)
        val = env.get(var_nom, '')
        return val if val else defaut
    else:
        return env.get(corps, '')

for l in part_compose.splitlines():
    l = l.strip()
    if not l:
        continue
    resolu = re.sub(r'\\$\{([^}]+)\}', remplacer_var, l)
    print(f"RESOLU: {resolu}")
`
  }
];
