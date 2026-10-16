'use strict';

module.exports = [
  {
    "id": "vo3-c6-e1",
    "chapter": 6,
    "title": "Simulateur de File d'Attente ACD Asterisk (Queue Strategies)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler la distribution automatique d'appels ACD selon les stratégies ringall, leastrecent et roundrobin.",
    "brief": "<p>Dans un centre de contacts Asterisk (fichier queues.conf), les appels entrants sont distribués aux agents membres selon une stratégie définie :</p><ul><li><code>ringall</code> : fait sonner simultanément tous les postes des agents disponibles (statut AVAILABLE).</li><li><code>leastrecent</code> : sélectionne l'agent disponible dont le dernier appel terminé remonte au plus longtemps (LAST_CALL_TS le plus ancien/faible).</li><li><code>roundrobin</code> : attribue les appels à tour de rôle parmi les agents disponibles selon un pointeur circulaire.</li></ul>\n<p>Statuts d'un agent :</p><ul><li><code>AVAILABLE</code> : prêt à recevoir un appel.</li><li><code>IN_CALL</code> : en ligne, ne peut recevoir d'appel.</li><li><code>PAUSED</code> : en pause, ne reçoit aucun appel.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>STRATEGY=<ringall|leastrecent|roundrobin></code><br>Lignes suivantes décrivant les agents de la file :<br><code>AGENT=<id> STATUS=<AVAILABLE|IN_CALL|PAUSED> LAST_CALL_TS=<timestamp_entier></code></p>\n<p>Règles de sélection :<br>1. Filtrer les agents dont <code>STATUS == \"AVAILABLE\"</code>.<br>2. Si aucun agent disponible -> afficher <code>AUCUN_AGENT_DISPONIBLE | ACTION:ATTENTE</code>.<br>3. Selon la stratégie :<br>   - <code>ringall</code> -> lister tous les IDs des agents disponibles séparés par des virgules (dans l'ordre d'apparition).<br>   - <code>leastrecent</code> -> choisir l'unique agent ayant le <code>LAST_CALL_TS</code> minimal. En cas d'égalité, prendre le premier dans l'ordre d'apparition.<br>   - <code>roundrobin</code> -> choisir le premier agent disponible dans l'ordre d'apparition.</p>\n<p>Format de sortie :<br>STRATEGY:<nom> | AGENTS_DISPOS:<nb> | SELECTION:<id(s)></p>",
    "starter": "# Grille d'analyse (vo3-c6-e1) — Simulateur de File d'Attente ACD Asterisk (Queue Strategies)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : STRATEGY=ringall\n# Données : AGENT=201 STATUS=AVAILABLE LAST_CALL_TS=100\n# Données : AGENT=202 STATUS=AVAILABLE LAST_CALL_TS=200\n# Données : AGENT=203 STATUS=PAUSED LAST_CALL_TS=50\n# Données : AGENT=204 STATUS=AVAILABLE LAST_CALL_TS=300\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : STRATEGY=roundrobin\n# Données : AGENT=301 STATUS=IN_CALL LAST_CALL_TS=10\n# Données : AGENT=302 STATUS=AVAILABLE LAST_CALL_TS=20\n# Données : AGENT=303 STATUS=AVAILABLE LAST_CALL_TS=5\nA_COMPLETER\n\n[Cas 3 — Cas de test 3]\n# Données : STRATEGY=leastrecent\n# Données : AGENT=401 STATUS=IN_CALL LAST_CALL_TS=10\n# Données : AGENT=402 STATUS=PAUSED LAST_CALL_TS=20\nA_COMPLETER\n",
    "hints": [
      "Pour leastrecent, choisissez l'agent dont la dernière fin d'appel est la plus ancienne.",
      "Passez l'agent sélectionné en statut occupé et appliquez le wrapuptime après l'appel."
    ],
    "examples": [
      {
        "stdin": "STRATEGY=leastrecent\nAGENT=101 STATUS=AVAILABLE LAST_CALL_TS=1600000500\nAGENT=102 STATUS=IN_CALL LAST_CALL_TS=1600000100\nAGENT=103 STATUS=AVAILABLE LAST_CALL_TS=1600000200\nAGENT=104 STATUS=PAUSED LAST_CALL_TS=1600000050",
        "expected": "STRATEGY:leastrecent | AGENTS_DISPOS:2 | SELECTION:103\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "STRATEGY:ringall | AGENTS_DISPOS:3 | SELECTION:201,202,204\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "STRATEGY:roundrobin | AGENTS_DISPOS:2 | SELECTION:302\n"
      },
      {
        "label": "Cas de test 3",
        "stdin": "cas:3",
        "expected": "STRATEGY:leastrecent | AGENTS_DISPOS:0 | SELECTION:AUCUN_AGENT_DISPONIBLE\n"
      }
    ],
    "solution": "[Exemple]\nSTRATEGY:leastrecent | AGENTS_DISPOS:2 | SELECTION:103\n\n\n[Cas 1 — Cas de test 1]\nSTRATEGY:ringall | AGENTS_DISPOS:3 | SELECTION:201,202,204\n\n\n[Cas 2 — Cas de test 2]\nSTRATEGY:roundrobin | AGENTS_DISPOS:2 | SELECTION:302\n\n\n[Cas 3 — Cas de test 3]\nSTRATEGY:leastrecent | AGENTS_DISPOS:0 | SELECTION:AUCUN_AGENT_DISPONIBLE"
  },
  {
    "id": "vo3-c6-e2",
    "chapter": 6,
    "title": "Moteur de Routage LCR (Least Cost Routing) Multi-Trunks",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les préfixes d'appels internationaux et sélectionner l'opérateur télécoms offrant le tarif optimal à la minute.",
    "brief": "<p>Le routage au moindre coût (Least Cost Routing, LCR) permet à un IPBX d'acheminer chaque appel sortant vers le fournisseur SIP proposant le tarif le plus bas pour la destination composée. Chaque règle de tarification opérateur associe :</p><ul><li>Un préfixe de destination (ex: '0033' pour France, '00221' pour Sénégal, '001' pour USA).</li><li>Un coût à la minute en centimes (ex: 1.5 c€/min).</li><li>Un coût d'établissement d'appel (connection fee, ex: 3.0 c€).</li></ul>\n<p>Pour un appel de durée <code>D</code> secondes :<br><code>cout_appel = connection_fee + rate_per_min * (D / 60.0)</code>.</p>\n<p>Format d'entrée :<br>Section 1 : Déclaration des trunks et tarifs sous la forme :<br><code>TRUNK=<nom> PREFIX=<prefixe> RATE_MIN=<tarif_min> CONN_FEE=<frais_connexion></code><br>Ligne de séparation : <code>---</code><br>Section 2 : Appels à router sous la forme :<br><code>CALL_ID=<id> DEST=<numero_compose> DURATION_SEC=<duree></code></p>\n<p>Règles de décision :<br>1. Pour chaque appel, identifier tous les trunks dont le <code>PREFIX</code> correspond au début du numéro <code>DEST</code> (longest prefix match si préfixes de longueurs différentes, ou évaluer tous les trunks matchant).<br>2. Pour chaque trunk éligible, calculer le coût total de l'appel :<br>   <code>cost = conn_fee + rate_min * (duration_sec / 60.0)</code>.<br>3. Sélectionner le trunk offrant le coût minimal. En cas d'égalité parfaite de coût, choisir le premier dans l'ordre alphabétique du nom de trunk.<br>4. Si aucun trunk ne correspond au préfixe, afficher <code>STATUT:ECHEC_ROUTAGE</code>.</p>\n<p>Format de sortie :<br>Pour chaque appel :<br><code>CALL:<id> | DEST:<numero> | DUREE:<d>s | TRUNK_CHOISI:<nom> | COUT:<cout:.2f>c€</code></p>",
    "starter": "# Grille d'analyse (vo3-c6-e2) — Moteur de Routage LCR (Least Cost Routing) Multi-Trunks\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : TRUNK=Op1 PREFIX=001 RATE_MIN=0.8 CONN_FEE=2.0\n# Données : TRUNK=Op2 PREFIX=001 RATE_MIN=1.5 CONN_FEE=0.0\n# Données : ---\n# Données : CALL_ID=US1 DEST=0012125551234 DURATION_SEC=300\n# Données : CALL_ID=US2 DEST=0012125551234 DURATION_SEC=60\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : TRUNK=Alpha PREFIX=0044 RATE_MIN=5.0 CONN_FEE=0.0\n# Données : ---\n# Données : CALL_ID=K1 DEST=00442079460912 DURATION_SEC=60\n# Données : CALL_ID=K2 DEST=0099999999999 DURATION_SEC=60\nA_COMPLETER\n",
    "hints": [
      "Appliquez le principe du plus long préfixe correspondant (longest prefix match).",
      "Retenez le trunk actif proposant le coût à la minute le plus faible."
    ],
    "examples": [
      {
        "stdin": "TRUNK=TrunkA PREFIX=0033 RATE_MIN=2.0 CONN_FEE=0.0\nTRUNK=TrunkB PREFIX=0033 RATE_MIN=1.2 CONN_FEE=5.0\nTRUNK=TrunkC PREFIX=00221 RATE_MIN=18.0 CONN_FEE=0.0\nTRUNK=TrunkD PREFIX=00221 RATE_MIN=15.0 CONN_FEE=10.0\n---\nCALL_ID=C1 DEST=0033140203040 DURATION_SEC=120\nCALL_ID=C2 DEST=0033140203040 DURATION_SEC=30\nCALL_ID=C3 DEST=00221706438029 DURATION_SEC=180",
        "expected": "CALL:C1 | DEST:0033140203040 | DUREE:120s | TRUNK_CHOISI:TrunkA | COUT:4.00c€\nCALL:C2 | DEST:0033140203040 | DUREE:30s | TRUNK_CHOISI:TrunkA | COUT:1.00c€\nCALL:C3 | DEST:00221706438029 | DUREE:180s | TRUNK_CHOISI:TrunkC | COUT:54.00c€\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "CALL:US1 | DEST:0012125551234 | DUREE:300s | TRUNK_CHOISI:Op1 | COUT:6.00c€\nCALL:US2 | DEST:0012125551234 | DUREE:60s | TRUNK_CHOISI:Op2 | COUT:1.50c€\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "CALL:K1 | DEST:00442079460912 | DUREE:60s | TRUNK_CHOISI:Alpha | COUT:5.00c€\nCALL:K2 | DEST:0099999999999 | DUREE:60s | TRUNK_CHOISI:AUCUN | COUT:0.00c€ | STATUT:ECHEC_ROUTAGE\n"
      }
    ],
    "solution": "[Exemple]\nCALL:C1 | DEST:0033140203040 | DUREE:120s | TRUNK_CHOISI:TrunkA | COUT:4.00c€\nCALL:C2 | DEST:0033140203040 | DUREE:30s | TRUNK_CHOISI:TrunkA | COUT:1.00c€\nCALL:C3 | DEST:00221706438029 | DUREE:180s | TRUNK_CHOISI:TrunkC | COUT:54.00c€\n\n\n[Cas 1 — Cas de test 1]\nCALL:US1 | DEST:0012125551234 | DUREE:300s | TRUNK_CHOISI:Op1 | COUT:6.00c€\nCALL:US2 | DEST:0012125551234 | DUREE:60s | TRUNK_CHOISI:Op2 | COUT:1.50c€\n\n\n[Cas 2 — Cas de test 2]\nCALL:K1 | DEST:00442079460912 | DUREE:60s | TRUNK_CHOISI:Alpha | COUT:5.00c€\nCALL:K2 | DEST:0099999999999 | DUREE:60s | TRUNK_CHOISI:AUCUN | COUT:0.00c€ | STATUT:ECHEC_ROUTAGE"
  },
  {
    "id": "vo3-c6-e3",
    "chapter": 6,
    "title": "Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser les journaux d'authentification Asterisk, détecter les attaques brute-force et générer des règles pare-feu iptables.",
    "brief": "<p>Les serveurs VoIP exposés sur Internet subissent de nombreuses attaques automatisées par scan SIP (outils sipvicious, friendly-scanner) testant des mots de passe en boucle. Lors d'une tentative frauduleuse, Asterisk retourne un code <code>401 Unauthorized</code> ou <code>403 Forbidden</code>. Pour neutraliser ces attaques, un système de défense active (Fail2ban) analyse les journaux de sécurité :</p><ul><li>Si une adresse IP source génère plus de <code>MAX_FAILURES</code> tentatives en échec (codes 401 ou 403) dans une fenêtre temporelle donnée, elle est bannie immédiatement.</li><li>La règle générée applique une commande de blocage : <code>iptables -I INPUT -s <IP> -p udp --dport 5060 -j DROP</code>.</li></ul>\n<p>Format d'entrée :<br>Première ligne : <code>MAX_FAILURES=<seuil></code><br>Lignes suivantes représentant des journaux d'événements de sécurité SIP :<br><code>TIMESTAMP=<sec> IP=<ip_source> EXTENSION=<ext_visée> STATUS_CODE=<code_http_sip></code></p>\n<p>Règles de traitement :<br>1. Compter les échecs (status_code == 401 ou status_code == 403) par adresse IP.<br>2. Lorsqu'une IP atteint ou dépasse le seuil <code>MAX_FAILURES</code>, elle bascule en statut <code>BANNI</code>.<br>3. Pour chaque ligne analysée, afficher l'état de l'IP.<br>4. Dès qu'un bannissement est prononcé pour la première fois pour une IP, afficher la règle firewall correspondante.</p>\n<p>Format de sortie :<br>Pour chaque ligne d'événement :<br>IP:<ip> | CODE:<status_code> | ECHECS:<nb_echecs_cumules> | ETAT:<OK|BANNI><br>(Si nouvellement bannie, afficher sur la ligne suivante :<br>ACTION:BAN | IP:<ip> | REGLE:iptables -I INPUT -s <ip> -p udp --dport 5060 -j DROP)</p>",
    "starter": "# Grille d'analyse (vo3-c6-e3) — Détecteur d'Attaques Brute-Force SIP & Générateur Fail2ban\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : MAX_FAILURES=2\n# Données : TIMESTAMP=1 IP=203.0.113.88 EXTENSION=100 STATUS_CODE=401\n# Données : TIMESTAMP=2 IP=203.0.113.88 EXTENSION=101 STATUS_CODE=401\n# Données : TIMESTAMP=3 IP=10.0.0.1 EXTENSION=500 STATUS_CODE=401\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : MAX_FAILURES=5\n# Données : TIMESTAMP=10 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=200\n# Données : TIMESTAMP=11 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=401\n# Données : TIMESTAMP=12 IP=1.2.3.4 EXTENSION=701 STATUS_CODE=200\nA_COMPLETER\n",
    "hints": [
      "Comptabilisez les échecs d'authentification 401 Unauthorized et 403 Forbidden par adresse IP.",
      "Dès que le seuil maxretry est atteint, émettez une règle de bannissement DROP."
    ],
    "examples": [
      {
        "stdin": "MAX_FAILURES=3\nTIMESTAMP=100 IP=198.51.100.22 EXTENSION=100 STATUS_CODE=401\nTIMESTAMP=102 IP=198.51.100.22 EXTENSION=101 STATUS_CODE=401\nTIMESTAMP=103 IP=192.168.1.50 EXTENSION=200 STATUS_CODE=200\nTIMESTAMP=104 IP=198.51.100.22 EXTENSION=102 STATUS_CODE=403\nTIMESTAMP=105 IP=198.51.100.22 EXTENSION=103 STATUS_CODE=401",
        "expected": "IP:198.51.100.22 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:198.51.100.22 | CODE:401 | ECHECS:2 | ETAT:OK\nIP:192.168.1.50 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:198.51.100.22 | CODE:403 | ECHECS:3 | ETAT:BANNI\nACTION:BAN | IP:198.51.100.22 | REGLE:iptables -I INPUT -s 198.51.100.22 -p udp --dport 5060 -j DROP\nIP:198.51.100.22 | CODE:401 | ECHECS:4 | ETAT:BANNI\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "IP:203.0.113.88 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:203.0.113.88 | CODE:401 | ECHECS:2 | ETAT:BANNI\nACTION:BAN | IP:203.0.113.88 | REGLE:iptables -I INPUT -s 203.0.113.88 -p udp --dport 5060 -j DROP\nIP:10.0.0.1 | CODE:401 | ECHECS:1 | ETAT:OK\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "IP:1.2.3.4 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:1.2.3.4 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:1.2.3.4 | CODE:200 | ECHECS:1 | ETAT:OK\n"
      }
    ],
    "solution": "[Exemple]\nIP:198.51.100.22 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:198.51.100.22 | CODE:401 | ECHECS:2 | ETAT:OK\nIP:192.168.1.50 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:198.51.100.22 | CODE:403 | ECHECS:3 | ETAT:BANNI\nACTION:BAN | IP:198.51.100.22 | REGLE:iptables -I INPUT -s 198.51.100.22 -p udp --dport 5060 -j DROP\nIP:198.51.100.22 | CODE:401 | ECHECS:4 | ETAT:BANNI\n\n\n[Cas 1 — Cas de test 1]\nIP:203.0.113.88 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:203.0.113.88 | CODE:401 | ECHECS:2 | ETAT:BANNI\nACTION:BAN | IP:203.0.113.88 | REGLE:iptables -I INPUT -s 203.0.113.88 -p udp --dport 5060 -j DROP\nIP:10.0.0.1 | CODE:401 | ECHECS:1 | ETAT:OK\n\n\n[Cas 2 — Cas de test 2]\nIP:1.2.3.4 | CODE:200 | ECHECS:0 | ETAT:OK\nIP:1.2.3.4 | CODE:401 | ECHECS:1 | ETAT:OK\nIP:1.2.3.4 | CODE:200 | ECHECS:1 | ETAT:OK"
  }
];
