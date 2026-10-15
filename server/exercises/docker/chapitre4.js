/**
 * Exercices du chapitre 4 — Docker B2.
 * Cycle de Vie des Conteneurs, Réseau &amp; Stockage.
 */
'use strict';

module.exports = [
  {
    id: 'dk2-c4-e1',
    chapter: 4,
    title: 'Gestionnaire d’états du cycle de vie d’un conteneur',
    level: 'n1',
    language: 'python',
    goal: 'Simuler la machine à états finis du cycle de vie d’un conteneur Docker et valider les transitions de commandes.',
    brief: '<p>Le script lit sur l\'entrée standard une suite de commandes Docker appliquées à un conteneur (une par ligne).<br>\nÉtats possibles : <code>ABSENT</code>, <code>CREATED</code>, <code>RUNNING</code>, <code>PAUSED</code>, <code>STOPPED</code>.<br>\nRègles de transition :<br>\n- Depuis <code>ABSENT</code> : <code>create</code> -&gt; <code>CREATED</code>, <code>run</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>CREATED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Depuis <code>RUNNING</code> : <code>pause</code> -&gt; <code>PAUSED</code>, <code>stop</code> -&gt; <code>STOPPED</code>, <code>restart</code> -&gt; <code>RUNNING</code>, <code>kill</code> -&gt; <code>STOPPED</code>.<br>\n- Depuis <code>PAUSED</code> : <code>unpause</code> -&gt; <code>RUNNING</code>.<br>\n- Depuis <code>STOPPED</code> : <code>start</code> -&gt; <code>RUNNING</code>, <code>rm</code> -&gt; <code>ABSENT</code>.<br>\n- Si une commande <code>rm</code> est tentée sur <code>RUNNING</code> ou <code>PAUSED</code> sans option force : afficher <code>TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: &lt;ETAT&gt;)</code>.<br>\n- Pour toute autre action invalide : afficher <code>TRANSITION_INVALIDE: Action &lt;cmd&gt; impossible depuis l\'etat &lt;ETAT&gt;</code>.<br>\n- Si la transition est valide, afficher :<br>\n<code>&lt;CMD&gt; -&gt; NOUVEL_ETAT: &lt;NOUVEL_ETAT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la machine à états du conteneur
`,
    hints: [
      'Initialiser l’état à ABSENT.',
      'Gérer scrupuleusement les conditions de rejet.'
    ],
    examples: [
      {
        stdin: 'create\nstart\npause\nunpause\nstop\nrm',
        expected: 'create -> NOUVEL_ETAT: CREATED\nstart -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nunpause -> NOUVEL_ETAT: RUNNING\nstop -> NOUVEL_ETAT: STOPPED\nrm -> NOUVEL_ETAT: ABSENT',
        note: 'Cycle de vie complet et nominal d’un conteneur.'
      }
    ],
    tests: [
      {
        label: 'Tentative de rm sur conteneur en cours d’exécution',
        stdin: 'run\nrm',
        expected: 'run -> NOUVEL_ETAT: RUNNING\nTRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: RUNNING)'
      },
      {
        label: 'Pause puis tentative de start sans unpause',
        stdin: 'run\npause\nstart',
        expected: 'run -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nTRANSITION_INVALIDE: Action start impossible depuis l\'etat PAUSED'
      },
      {
        label: 'Kill et redémarrage',
        stdin: 'run\nkill\nstart',
        expected: 'run -> NOUVEL_ETAT: RUNNING\nkill -> NOUVEL_ETAT: STOPPED\nstart -> NOUVEL_ETAT: RUNNING'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

etat = "ABSENT"

for cmd in lignes:
    c = cmd.lower()
    if c == 'create':
        if etat == 'ABSENT':
            etat = 'CREATED'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'run':
        if etat == 'ABSENT':
            etat = 'RUNNING'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'start':
        if etat in ('CREATED', 'STOPPED'):
            etat = 'RUNNING'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'pause':
        if etat == 'RUNNING':
            etat = 'PAUSED'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'unpause':
        if etat == 'PAUSED':
            etat = 'RUNNING'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c in ('stop', 'kill'):
        if etat == 'RUNNING':
            etat = 'STOPPED'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'restart':
        if etat == 'RUNNING':
            etat = 'RUNNING'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    elif c == 'rm':
        if etat in ('RUNNING', 'PAUSED'):
            print(f"TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: {etat})")
        elif etat in ('CREATED', 'STOPPED'):
            etat = 'ABSENT'
            print(f"{cmd} -> NOUVEL_ETAT: {etat}")
        else:
            print(f"TRANSITION_INVALIDE: Action {cmd} impossible depuis l'etat {etat}")
    else:
        print(f"TRANSITION_INVALIDE: Commande inconnue {cmd}")
`
  },
  {
    id: 'dk2-c4-e2',
    chapter: 4,
    title: 'Simulateur de redirection de ports (Port Mapping NAT) et conflits',
    level: 'n2',
    language: 'python',
    goal: 'Simuler la table de translation d’adresses NAT et détecter les collisions de ports hôte.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de redirection de ports Docker au format <code>&lt;Conteneur&gt; &lt;Publication&gt;</code>.<br>\nFormulats de publication :<br>\n- <code>HotePort:ConteneurPort</code> -&gt; IP par défaut <code>0.0.0.0</code>.<br>\n- <code>IP:HotePort:ConteneurPort</code>.<br>\nRègles de validation :<br>\n- Une paire (<code>IP_Hote</code>, <code>HotePort</code>) ne peut être allouée qu\'à un seul conteneur. (L\'IP <code>0.0.0.0</code> entre en conflit avec n\'importe quelle IP spécifique sur le même port).<br>\n- Si le port est libre : enregistrer la règle et afficher :<br>\n  <code>PUBLICATION: &lt;Conteneur&gt; -&gt; NAT: &lt;IP&gt;:&lt;HotePort&gt; =&gt; &lt;ConteneurPort&gt;/tcp (SUCCES)</code><br>\n- S\'il y a conflit de port sur l\'hôte : afficher :<br>\n  <code>CONFLIT_PORT: &lt;Conteneur&gt; -&gt; Port hote &lt;HotePort&gt; deja reserve par &lt;ConteneurPrecedent&gt; (ECHEC)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler les redirections de port NAT et détecter les conflits
`,
    hints: [
      'Gérer un dictionnaire associant (port) ou (ip, port) au conteneur propriétaire.',
      '0.0.0.0 écoute sur toutes les interfaces.'
    ],
    examples: [
      {
        stdin: 'web_nginx 8080:80\napi_node 3000:3000\nautre_nginx 8080:80',
        expected: 'PUBLICATION: web_nginx -> NAT: 0.0.0.0:8080 => 80/tcp (SUCCES)\nPUBLICATION: api_node -> NAT: 0.0.0.0:3000 => 3000/tcp (SUCCES)\nCONFLIT_PORT: autre_nginx -> Port hote 8080 deja reserve par web_nginx (ECHEC)',
        note: 'Le port 8080 est déjà réservé par le premier conteneur.'
      }
    ],
    tests: [
      {
        label: 'Publications sur interfaces IP distinctes',
        stdin: 'db1 127.0.0.1:5432:5432\ndb2 192.168.1.10:5432:5432',
        expected: 'PUBLICATION: db1 -> NAT: 127.0.0.1:5432 => 5432/tcp (SUCCES)\nPUBLICATION: db2 -> NAT: 192.168.1.10:5432 => 5432/tcp (SUCCES)'
      },
      {
        label: 'Conflit 0.0.0.0 avec IP spécifique',
        stdin: 'app1 8000:80\napp2 127.0.0.1:8000:80',
        expected: 'PUBLICATION: app1 -> NAT: 0.0.0.0:8000 => 80/tcp (SUCCES)\nCONFLIT_PORT: app2 -> Port hote 8000 deja reserve par app1 (ECHEC)'
      },
      {
        label: 'Multiples conteneurs sur ports conteneur identiques mais ports hôte distincts',
        stdin: 'c1 8001:80\nc2 8002:80\nc3 8003:80',
        expected: 'PUBLICATION: c1 -> NAT: 0.0.0.0:8001 => 80/tcp (SUCCES)\nPUBLICATION: c2 -> NAT: 0.0.0.0:8002 => 80/tcp (SUCCES)\nPUBLICATION: c3 -> NAT: 0.0.0.0:8003 => 80/tcp (SUCCES)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Stocker { port: { ip: nom_conteneur } }
ports_alloues = {}

for l in lignes:
    parties = l.split()
    if len(parties) != 2:
        continue
    conteneur, pub = parties[0], parties[1]

    sub = pub.split(':')
    if len(sub) == 2:
        ip = "0.0.0.0"
        hote_port = int(sub[0])
        c_port = int(sub[1])
    elif len(sub) == 3:
        ip = sub[0]
        hote_port = int(sub[1])
        c_port = int(sub[2])
    else:
        continue

    # Verifier conflit
    conflit = None
    if hote_port in ports_alloues:
        table_ip = ports_alloues[hote_port]
        if '0.0.0.0' in table_ip:
            conflit = table_ip['0.0.0.0']
        elif ip == '0.0.0.0' and len(table_ip) > 0:
            conflit = list(table_ip.values())[0]
        elif ip in table_ip:
            conflit = table_ip[ip]

    if conflit:
        print(f"CONFLIT_PORT: {conteneur} -> Port hote {hote_port} deja reserve par {conflit} (ECHEC)")
    else:
        if hote_port not in ports_alloues:
            ports_alloues[hote_port] = {}
        ports_alloues[hote_port][ip] = conteneur
        print(f"PUBLICATION: {conteneur} -> NAT: {ip}:{hote_port} => {c_port}/tcp (SUCCES)")
`
  },
  {
    id: 'dk2-c4-e3',
    chapter: 4,
    title: 'Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs',
    level: 'n3',
    language: 'python',
    goal: 'Qualifier la nature, la persistance et les droits d’accès des options de stockage Docker (-v, --mount, --tmpfs).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de stockage (une par ligne).<br>\nRègles d\'analyse :<br>\n1. <code>--tmpfs &lt;cible&gt;</code> :<br>\n   - Type : <code>TMPFS</code><br>\n   - Localisation : <code>Memoire vive RAM de l\'hote</code><br>\n   - Persistance : <code>VOLATILE (detruit a l\'arret du conteneur)</code><br>\n   - Droits : <code>LECTURE_ECRITURE</code><br>\n2. <code>-v &lt;source&gt;:&lt;cible&gt;[:&lt;opt&gt;]</code> :<br>\n   - Si source commence par <code>/</code>, <code>./</code> ou <code>../</code> : Type <code>BIND_MOUNT</code>, Localisation <code>Repertoire specifique de la machine hote</code>.<br>\n   - Sinon : Type <code>VOLUME_NOMME</code>, Localisation <code>Espace reserve du daemon (/var/lib/docker/volumes/)</code>.<br>\n   - Persistance : <code>PERSISTANT (survit a docker rm)</code>.<br>\n   - Droits : <code>LECTURE_SEULE</code> si <code>:ro</code> est spécifié, sinon <code>LECTURE_ECRITURE</code>.<br>\nAfficher :<br>\n<code>STOCKAGE: &lt;entree&gt; -&gt; TYPE: &lt;TYPE&gt; | &lt;LOCALISATION&gt; | &lt;PERSISTANCE&gt; | &lt;DROITS&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer le type de montage et la persistance des données
`,
    hints: [
      'Un chemin absolu ou relatif indique un Bind Mount.',
      'Un identifiant sans slash indique un volume Docker nommé.'
    ],
    examples: [
      {
        stdin: '-v db_data:/var/lib/mysql\n-v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro\n--tmpfs /tmp',
        expected: 'STOCKAGE: -v db_data:/var/lib/mysql -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE\nSTOCKAGE: -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE\nSTOCKAGE: --tmpfs /tmp -> TYPE: TMPFS | Memoire vive RAM de l\'hote | VOLATILE (detruit a l\'arret du conteneur) | LECTURE_ECRITURE',
        note: 'Distinction formelle des 3 mécanismes de stockage sous Docker.'
      }
    ],
    tests: [
      {
        label: 'Bind mount en lecture seule',
        stdin: '-v /var/log/app:/app/logs:ro',
        expected: 'STOCKAGE: -v /var/log/app:/app/logs:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE'
      },
      {
        label: 'Volume nommé avec droit par défaut rw',
        stdin: '-v redis_persist:/data',
        expected: 'STOCKAGE: -v redis_persist:/data -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE'
      },
      {
        label: 'Stockage éphémère tmpfs pour sécurité',
        stdin: '--tmpfs /run/secrets',
        expected: 'STOCKAGE: --tmpfs /run/secrets -> TYPE: TMPFS | Memoire vive RAM de l\'hote | VOLATILE (detruit a l\'arret du conteneur) | LECTURE_ECRITURE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    if l.startswith('--tmpfs'):
        typ = "TMPFS"
        loc = "Memoire vive RAM de l'hote"
        pers = "VOLATILE (detruit a l'arret du conteneur)"
        droits = "LECTURE_ECRITURE"
    elif l.startswith('-v'):
        arg = l[2:].strip()
        parties = arg.split(':')
        src = parties[0]
        droits = "LECTURE_SEULE" if len(parties) >= 3 and parties[2] == 'ro' else "LECTURE_ECRITURE"
        pers = "PERSISTANT (survit a docker rm)"
        if src.startswith('/') or src.startswith('./') or src.startswith('../'):
            typ = "BIND_MOUNT"
            loc = "Repertoire specifique de la machine hote"
        else:
            typ = "VOLUME_NOMME"
            loc = "Espace reserve du daemon (/var/lib/docker/volumes/)"
    else:
        typ = "INCONNU"
        loc = ""
        pers = ""
        droits = ""

    print(f"STOCKAGE: {l} -> TYPE: {typ} | {loc} | {pers} | {droits}")
`
  }
];
