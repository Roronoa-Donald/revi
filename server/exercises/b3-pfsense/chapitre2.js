'use strict';

module.exports = [
  {
    "id": "pf3-c2-e1",
    "chapter": 2,
    "title": "Résolveur d’alias d’adresses et de ports pfSense (Firewall Aliases)",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier si une valeur figure exactement dans un alias représenté par une liste simple.",
    "brief": "<p>Les <strong>Alias</strong> dans pfSense regroupent des adresses IP, des réseaux ou des ports sous un nom unique (ex: <code>WEB_PORTS</code> pour <code>80,443</code>). Dans ce <strong>modèle pédagogique</strong>, les valeurs sont des adresses IP ou des ports unitaires : on vérifie uniquement une égalité exacte, sans sous-réseaux ni plages.<br><br>\nChaque cas définit un alias :<br>\n<code>ALIAS_DEF name=&lt;nom&gt; values=&lt;valeur1,valeur2,...&gt;</code>.<br>\nLes valeurs sont séparées par des virgules. Puis viennent les vérifications :<br>\n<code>CHECK_ALIAS alias=&lt;nom&gt; target=&lt;valeur&gt;</code>.<br>\nChaque vérification utilise l'alias défini dans le cas. Si <code>target</code> est exactement égal à l'une de ses valeurs, indiquer <code>match=YES</code> ; sinon indiquer <code>match=NO</code>.<br><br>\nPour chaque vérification, afficher :<br>\n<code>ALIAS_RESULT alias={alias} target={target} match={YES|NO}</code>.<br>\nSaisissez une ligne par vérification dans la zone du cas.</p>",
    "starter": "# Grille d'analyse (pf3-c2-e1) — Résolveur d’alias d’adresses et de ports pfSense (Firewall Aliases)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alias d’adresses IP de serveurs DNS]\n# Données : ALIAS_DEF name=DNS_SERVERS values=1.1.1.1,8.8.8.8,9.9.9.9\n# Données : CHECK_ALIAS alias=DNS_SERVERS target=8.8.8.8\n# Données : CHECK_ALIAS alias=DNS_SERVERS target=192.168.1.1\nA_COMPLETER\n\n[Cas 2 — Alias contenant un seul élément]\n# Données : ALIAS_DEF name=BASTION values=10.0.0.100\n# Données : CHECK_ALIAS alias=BASTION target=10.0.0.100\n# Données : CHECK_ALIAS alias=BASTION target=10.0.0.101\nA_COMPLETER\n\n[Cas 3 — Plusieurs vérifications consécutives]\n# Données : ALIAS_DEF name=ADMIN_PORTS values=22,3389,8443\n# Données : CHECK_ALIAS alias=ADMIN_PORTS target=22\n# Données : CHECK_ALIAS alias=ADMIN_PORTS target=80\n# Données : CHECK_ALIAS alias=ADMIN_PORTS target=3389\nA_COMPLETER\n",
    "hints": [
      "Stocker les valeurs de l’alias dans un ensemble set().",
      "Tester si target est présent dans l’ensemble pour répondre YES ou NO."
    ],
    "examples": [
      {
        "stdin": "ALIAS_DEF name=WEB_PORTS values=80,443,8080\nCHECK_ALIAS alias=WEB_PORTS target=443\nCHECK_ALIAS alias=WEB_PORTS target=22",
        "expected": "ALIAS_RESULT alias=WEB_PORTS target=443 match=YES\nALIAS_RESULT alias=WEB_PORTS target=22 match=NO",
        "note": "Le port 443 est dans l’alias, le port 22 n’y est pas."
      }
    ],
    "tests": [
      {
        "label": "Alias d’adresses IP de serveurs DNS",
        "stdin": "cas:1",
        "expected": "ALIAS_RESULT alias=DNS_SERVERS target=8.8.8.8 match=YES\nALIAS_RESULT alias=DNS_SERVERS target=192.168.1.1 match=NO"
      },
      {
        "label": "Alias contenant un seul élément",
        "stdin": "cas:2",
        "expected": "ALIAS_RESULT alias=BASTION target=10.0.0.100 match=YES\nALIAS_RESULT alias=BASTION target=10.0.0.101 match=NO"
      },
      {
        "label": "Plusieurs vérifications consécutives",
        "stdin": "cas:3",
        "expected": "ALIAS_RESULT alias=ADMIN_PORTS target=22 match=YES\nALIAS_RESULT alias=ADMIN_PORTS target=80 match=NO\nALIAS_RESULT alias=ADMIN_PORTS target=3389 match=YES"
      }
    ],
    "solution": "[Exemple]\nALIAS_RESULT alias=WEB_PORTS target=443 match=YES\nALIAS_RESULT alias=WEB_PORTS target=22 match=NO\n\n[Cas 1 — Alias d’adresses IP de serveurs DNS]\nALIAS_RESULT alias=DNS_SERVERS target=8.8.8.8 match=YES\nALIAS_RESULT alias=DNS_SERVERS target=192.168.1.1 match=NO\n\n[Cas 2 — Alias contenant un seul élément]\nALIAS_RESULT alias=BASTION target=10.0.0.100 match=YES\nALIAS_RESULT alias=BASTION target=10.0.0.101 match=NO\n\n[Cas 3 — Plusieurs vérifications consécutives]\nALIAS_RESULT alias=ADMIN_PORTS target=22 match=YES\nALIAS_RESULT alias=ADMIN_PORTS target=80 match=NO\nALIAS_RESULT alias=ADMIN_PORTS target=3389 match=YES"
  },
  {
    "id": "pf3-c2-e2",
    "chapter": 2,
    "title": "Moteur d’évaluation séquentielle de règles de filtrage (First-Match Wins)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’évaluation ordonnée des règles dans pfSense : la première règle correspondante s’applique immédiatement.",
    "brief": "<p>Contrairement au moteur PF brut sous OpenBSD (où la dernière règle gagne sauf directive <code>quick</code>), <strong>pfSense applique par défaut le comportement First-Match</strong> (toutes les règles graphiques portent implicitement l'option <code>quick</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\nPuis des paquets à évaluer :<br>\n<code>EVAL_PKT pkt_id=&lt;id&gt; src=&lt;ip&gt; port=&lt;int&gt;</code>.<br><br>\nRègles :<br>\n- Parcourir les règles dans l'ordre de déclaration.<br>\n- La première règle qui correspond (src match et port match) s'applique :<br>\n  <code>decision={PASS|BLOCK} matched_rule={rule_id}</code>.<br>\n- Si aucune règle ne correspond, la règle implicite de fin de chaîne s'applique (Deny All) :<br>\n  <code>decision=BLOCK matched_rule=DEFAULT_DENY</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>PKT_DECISION pkt_id={pkt_id} decision={decision} rule={matched_rule}</code></p>",
    "starter": "# Grille d'analyse (pf3-c2-e2) — Moteur d’évaluation séquentielle de règles de filtrage (First-Match Wins)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet ne correspondant à aucune règle (Default Deny)]\n# Données : RULE id=R1 action=PASS src=10.0.0.1 port=22\n# Données : EVAL_PKT pkt_id=EXT src=192.168.1.50 port=80\nA_COMPLETER\n\n[Cas 2 — Règle générique masquant une règle ultérieure (Shadowing)]\n# Données : RULE id=R_ALLOW_ALL action=PASS src=any port=any\n# Données : RULE id=R_BLOCK_SSH action=BLOCK src=any port=22\n# Données : EVAL_PKT pkt_id=P_SSH src=172.16.0.4 port=22\nA_COMPLETER\n\n[Cas 3 — Série de règles avec filtrage strict par port]\n# Données : RULE id=R1 action=PASS src=any port=53\n# Données : RULE id=R2 action=PASS src=any port=80\n# Données : RULE id=R3 action=BLOCK src=any port=any\n# Données : EVAL_PKT pkt_id=PKT_DNS src=1.2.3.4 port=53\n# Données : EVAL_PKT pkt_id=PKT_HTTP src=1.2.3.4 port=80\n# Données : EVAL_PKT pkt_id=PKT_TELNET src=1.2.3.4 port=23\nA_COMPLETER\n",
    "hints": [
      "Stocker les règles dans une liste ordonnée.",
      "Pour chaque paquet, boucler sur les règles et s’arrêter dès la première correspondance."
    ],
    "examples": [
      {
        "stdin": "RULE id=R1 action=PASS src=192.168.1.10 port=443\nRULE id=R2 action=BLOCK src=192.168.1.10 port=any\nEVAL_PKT pkt_id=P1 src=192.168.1.10 port=443\nEVAL_PKT pkt_id=P2 src=192.168.1.10 port=80",
        "expected": "PKT_DECISION pkt_id=P1 decision=PASS rule=R1\nPKT_DECISION pkt_id=P2 decision=BLOCK rule=R2",
        "note": "P1 correspond à R1 (port 443). P2 ne correspond pas à R1, mais correspond à R2 (port any)."
      }
    ],
    "tests": [
      {
        "label": "Paquet ne correspondant à aucune règle (Default Deny)",
        "stdin": "cas:1",
        "expected": "PKT_DECISION pkt_id=EXT decision=BLOCK rule=DEFAULT_DENY"
      },
      {
        "label": "Règle générique masquant une règle ultérieure (Shadowing)",
        "stdin": "cas:2",
        "expected": "PKT_DECISION pkt_id=P_SSH decision=PASS rule=R_ALLOW_ALL"
      },
      {
        "label": "Série de règles avec filtrage strict par port",
        "stdin": "cas:3",
        "expected": "PKT_DECISION pkt_id=PKT_DNS decision=PASS rule=R1\nPKT_DECISION pkt_id=PKT_HTTP decision=PASS rule=R2\nPKT_DECISION pkt_id=PKT_TELNET decision=BLOCK rule=R3"
      }
    ],
    "solution": "[Exemple]\nPKT_DECISION pkt_id=P1 decision=PASS rule=R1\nPKT_DECISION pkt_id=P2 decision=BLOCK rule=R2\n\n[Cas 1 — Paquet ne correspondant à aucune règle (Default Deny)]\nPKT_DECISION pkt_id=EXT decision=BLOCK rule=DEFAULT_DENY\n\n[Cas 2 — Règle générique masquant une règle ultérieure (Shadowing)]\nPKT_DECISION pkt_id=P_SSH decision=PASS rule=R_ALLOW_ALL\n\n[Cas 3 — Série de règles avec filtrage strict par port]\nPKT_DECISION pkt_id=PKT_DNS decision=PASS rule=R1\nPKT_DECISION pkt_id=PKT_HTTP decision=PASS rule=R2\nPKT_DECISION pkt_id=PKT_TELNET decision=BLOCK rule=R3"
  },
  {
    "id": "pf3-c2-e3",
    "chapter": 2,
    "title": "Analyse pédagogique d’une table d’états simplifiée",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer des règles d'exercice à une table d'états simplifiée et repérer des connexions semi-ouvertes sans conclure à une attaque réelle.",
    "brief": "<p>Un pare-feu à états comme pfSense conserve des informations sur les flux. Ce <strong>modèle pédagogique</strong> est fictif : les lignes <code>STATE_ENTRY</code> et <code>STATE_DIAG</code> ne sont pas la sortie de <code>pfctl -ss</code>, et le seuil de 30 secondes ainsi que les étiquettes sont propres à cet exercice. Une entrée seule ne prouve pas une attaque ou une panne réelle.<br><br>\nChaque cas contient des lignes :<br>\n<code>STATE_ENTRY id=&lt;id&gt; proto=&lt;tcp|udp&gt; src=&lt;ip:port&gt; dst=&lt;ip:port&gt; state=&lt;état&gt; age_sec=&lt;entier&gt;</code>.<br>\nDans les données, <code>age_sec</code> est un entier positif ou nul. Les états possibles sont <code>SYN_SENT</code>, <code>ESTABLISHED</code>, <code>FIN_WAIT</code> et <code>TIME_WAIT</code> pour TCP, ou <code>SINGLE</code> pour UDP. Les autres protocoles et états sont hors périmètre. Les adresses ne changent pas la classification.<br><br>\nRègles du modèle :<br>\n1. Pour <code>proto=tcp</code> et <code>state=SYN_SENT</code> :<br>\n   - Si <code>age_sec &gt; 30</code> : <code>alert=HALF_OPEN_ATTACK_SUSPECT</code>.<br>\n   - Si <code>age_sec &lt;= 30</code> : <code>alert=HEALTHY_SESSION</code>.<br>\n2. Pour TCP et <code>state=ESTABLISHED</code> : <code>alert=HEALTHY_SESSION</code>.<br>\n3. Pour TCP et <code>state=FIN_WAIT</code> ou <code>state=TIME_WAIT</code> : <code>alert=CLOSING_SESSION</code>.<br>\n4. Pour UDP et <code>state=SINGLE</code> : <code>alert=STATELESS_UDP</code>.<br><br>\nPour un <code>SYN_SENT</code>, <code>HEALTHY_SESSION</code> signifie seulement que le seuil n'est pas dépassé : cela ne garantit ni une connexion établie ni sa sécurité. <code>STATELESS_UDP</code> est une étiquette de sortie, pas une affirmation sur le suivi des flux UDP par pfSense.<br><br>\nPour chaque ligne, afficher :<br>\n<code>STATE_DIAG id={id} proto={proto} state={state} alert={alert}</code>.<br>\nSaisissez une ligne de résultat par entrée dans la zone du cas.</p>",
    "starter": "# Grille d'analyse (pf3-c2-e3) — Analyse pédagogique d’une table d’états simplifiée\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Session TCP normale établie]\n# Données : STATE_ENTRY id=20 proto=tcp src=10.0.0.5:52000 dst=1.1.1.1:443 state=ESTABLISHED age_sec=120\nA_COMPLETER\n\n[Cas 2 — Trafic UDP, session en fermeture et seuils SYN_SENT]\n# Données : STATE_ENTRY id=30 proto=udp src=10.0.0.5:53000 dst=8.8.8.8:53 state=SINGLE age_sec=5\n# Données : STATE_ENTRY id=31 proto=tcp src=10.0.0.5:54000 dst=8.8.8.8:80 state=TIME_WAIT age_sec=15\n# Données : STATE_ENTRY id=41 proto=tcp src=192.168.1.16:4401 dst=10.0.0.1:80 state=SYN_SENT age_sec=30\n# Données : STATE_ENTRY id=42 proto=tcp src=192.168.1.17:4402 dst=10.0.0.1:80 state=SYN_SENT age_sec=31\nA_COMPLETER\n\n[Cas 3 — SYN_SENT récent sous le seuil d’alerte]\n# Données : STATE_ENTRY id=40 proto=tcp src=192.168.1.15:4400 dst=10.0.0.1:80 state=SYN_SENT age_sec=5\nA_COMPLETER\n",
    "hints": [
      "Pour SYN_SENT, distinguer strictement plus de 30 secondes de 30 secondes ou moins.",
      "Pour les autres cas, suivre les étiquettes du modèle selon le protocole et l'état."
    ],
    "examples": [
      {
        "stdin": "STATE_ENTRY id=10 proto=tcp src=192.168.1.10:49152 dst=93.184.216.34:443 state=SYN_SENT age_sec=45",
        "expected": "STATE_DIAG id=10 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT",
        "note": "Dans le modèle, 45 est strictement supérieur à 30 : l'étiquette signale un dépassement, pas une attaque avérée."
      }
    ],
    "tests": [
      {
        "label": "Session TCP normale établie",
        "stdin": "cas:1",
        "expected": "STATE_DIAG id=20 proto=tcp state=ESTABLISHED alert=HEALTHY_SESSION"
      },
      {
        "label": "Trafic UDP, session en fermeture et seuils SYN_SENT",
        "stdin": "cas:2",
        "expected": "STATE_DIAG id=30 proto=udp state=SINGLE alert=STATELESS_UDP\nSTATE_DIAG id=31 proto=tcp state=TIME_WAIT alert=CLOSING_SESSION\nSTATE_DIAG id=41 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION\nSTATE_DIAG id=42 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT"
      },
      {
        "label": "SYN_SENT récent sous le seuil d’alerte",
        "stdin": "cas:3",
        "expected": "STATE_DIAG id=40 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION"
      }
    ],
    "solution": "[Exemple]\nSTATE_DIAG id=10 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT\n\n[Cas 1 — Session TCP normale établie]\nSTATE_DIAG id=20 proto=tcp state=ESTABLISHED alert=HEALTHY_SESSION\n\n[Cas 2 — Trafic UDP, session en fermeture et seuils SYN_SENT]\nSTATE_DIAG id=30 proto=udp state=SINGLE alert=STATELESS_UDP\nSTATE_DIAG id=31 proto=tcp state=TIME_WAIT alert=CLOSING_SESSION\nSTATE_DIAG id=41 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION\nSTATE_DIAG id=42 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT\n\n[Cas 3 — SYN_SENT récent sous le seuil d’alerte]\nSTATE_DIAG id=40 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION"
  }
];
