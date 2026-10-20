'use strict';

module.exports = [
  {
    "id": "fw3-c3-e1",
    "chapter": 3,
    "title": "Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter le moteur séquentiel d’évaluation des règles de filtrage avec politique de refus par défaut.",
    "brief": "<p>Dans un pare-feu réseau, les listes de contrôle d'accès (ACL) sont lues séquentiellement de haut en bas : la <strong>première règle qui correspond</strong> au paquet détermine son sort (<code>First-Match-Wins</code>). Si aucune règle ne correspond, la politique de sécurité implicite applique un refus (<code>DEFAULT_DROP</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas. Des règles ordonnées :<br>\n<code>RULE id=&lt;id&gt; action=&lt;PERMIT|DENY&gt; proto=&lt;TCP|UDP|ICMP|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;port|ANY&gt;</code>.<br>\n2. Des paquets à évaluer :<br>\n<code>PACKET id=&lt;pid&gt; proto=&lt;proto&gt; src=&lt;ip&gt; dst=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>EVAL packet={pid} action={PERMIT|DENY} matched={rule_id|DEFAULT_DROP}</code></p>",
    "starter": "# Grille d'analyse (fw3-c3-e1) — Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet ne correspondant à aucune règle menant au DEFAULT_DROP]\n# Données : RULE id=R10 action=PERMIT proto=UDP src=10.0.0.1 dst=8.8.8.8 dport=53\n# Données : PACKET id=P3 proto=TCP src=10.0.0.1 dst=8.8.8.8 dport=53\nA_COMPLETER\n\n[Cas 2 — Filtrage par adresses IP spécifiques et ANY sur le port]\n# Données : RULE id=ADM1 action=PERMIT proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\n# Données : RULE id=BLOCK_ADM action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\n# Données : RULE id=WEB action=PERMIT proto=TCP src=ANY dst=ANY dport=80\n# Données : PACKET id=T1 proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\n# Données : PACKET id=T2 proto=TCP src=192.168.1.105 dst=10.0.0.1 dport=22\n# Données : PACKET id=T3 proto=TCP src=192.168.1.105 dst=172.16.0.2 dport=80\nA_COMPLETER\n\n[Cas 3 — Protocole ICMP sans numéro de port]\n# Données : RULE id=PING action=PERMIT proto=ICMP src=ANY dst=10.0.0.1 dport=ANY\n# Données : PACKET id=IC1 proto=ICMP src=192.168.1.20 dst=10.0.0.1 dport=0\n# Données : PACKET id=IC2 proto=ICMP src=192.168.1.20 dst=10.0.0.2 dport=0\nA_COMPLETER\n",
    "hints": [
      "Stocker les règles dans une liste ordonnée.",
      "Pour chaque critère, une valeur ANY correspond toujours à toute valeur du paquet.",
      "S’arrêter dès la première règle correspondante."
    ],
    "examples": [
      {
        "stdin": "RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.10 dport=443\nRULE id=R2 action=DENY proto=ANY src=ANY dst=10.0.0.10 dport=ANY\nPACKET id=P1 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=443\nPACKET id=P2 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=22",
        "expected": "EVAL packet=P1 action=PERMIT matched=R1\nEVAL packet=P2 action=DENY matched=R2",
        "note": "P1 matche R1 en premier (PERMIT), P2 ne matche pas R1 mais matche R2 (DENY)."
      }
    ],
    "tests": [
      {
        "label": "Paquet ne correspondant à aucune règle menant au DEFAULT_DROP",
        "stdin": "cas:1",
        "expected": "EVAL packet=P3 action=DENY matched=DEFAULT_DROP"
      },
      {
        "label": "Filtrage par adresses IP spécifiques et ANY sur le port",
        "stdin": "cas:2",
        "expected": "EVAL packet=T1 action=PERMIT matched=ADM1\nEVAL packet=T2 action=DENY matched=BLOCK_ADM\nEVAL packet=T3 action=PERMIT matched=WEB"
      },
      {
        "label": "Protocole ICMP sans numéro de port",
        "stdin": "cas:3",
        "expected": "EVAL packet=IC1 action=PERMIT matched=PING\nEVAL packet=IC2 action=DENY matched=DEFAULT_DROP"
      }
    ],
    "solution": "[Exemple]\nEVAL packet=P1 action=PERMIT matched=R1\nEVAL packet=P2 action=DENY matched=R2\n\n[Cas 1 — Paquet ne correspondant à aucune règle menant au DEFAULT_DROP]\nEVAL packet=P3 action=DENY matched=DEFAULT_DROP\n\n[Cas 2 — Filtrage par adresses IP spécifiques et ANY sur le port]\nEVAL packet=T1 action=PERMIT matched=ADM1\nEVAL packet=T2 action=DENY matched=BLOCK_ADM\nEVAL packet=T3 action=PERMIT matched=WEB\n\n[Cas 3 — Protocole ICMP sans numéro de port]\nEVAL packet=IC1 action=PERMIT matched=PING\nEVAL packet=IC2 action=DENY matched=DEFAULT_DROP"
  },
  {
    "id": "fw3-c3-e2",
    "chapter": 3,
    "title": "Détecteur d’anomalies et masquage de règles (Rule Shadowing)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser une politique de sécurité pour détecter les règles masquées (shadowed) ou redondantes.",
    "brief": "<p>Une anomalie fréquente dans les jeux de règles de pare-feu est le <strong>masquage de règle</strong> (<em>Shadowing</em>) : une règle antérieure <code>R1</code> est plus générale ou identique à une règle suivante <code>R2</code>, rendant <code>R2</code> totalement inaccessible.<br><br>\nCritères simplifiés pour que R1 masque R2 (R1 placée avant R2) :<br>\n- Protocole : <code>R1.proto == R2.proto</code> ou <code>R1.proto == 'ANY'</code>.<br>\n- Source : <code>R1.src == R2.src</code> ou <code>R1.src == 'ANY'</code>.<br>\n- Destination : <code>R1.dst == R2.dst</code> ou <code>R1.dst == 'ANY'</code>.<br>\n- Port destination : <code>R1.dport == R2.dport</code> ou <code>R1.dport == 'ANY'</code>.<br><br>\nSi ces 4 conditions d'inclusion sont réunies pour au moins une règle antérieure R1 :<br>\n- Si <code>R1.action != R2.action</code> : R2 est masquée et son action ne s'appliquera jamais -> <code>SHADOWED by {R1.id}</code>.<br>\n- Si <code>R1.action == R2.action</code> : R2 est redondante et inutile -> <code>REDUNDANT with {R1.id}</code>.<br>\n- Sinon : la règle est active et valide -> <code>OK</code>.<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque règle déclarée, afficher :<br>\n<code>ANALYZE rule={id} status={OK | SHADOWED by {r1} | REDUNDANT with {r1}}</code></p>",
    "starter": "# Grille d'analyse (fw3-c3-e2) — Détecteur d’anomalies et masquage de règles (Rule Shadowing)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection d’une redondance parfaite entre deux règles]\n# Données : RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=443\n# Données : RULE id=R2 action=PERMIT proto=TCP src=192.168.1.1 dst=10.0.0.5 dport=443\n# Données : RULE id=R3 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=80\nA_COMPLETER\n\n[Cas 2 — Règles spécifiques d’abord puis règle générale : politique saine]\n# Données : RULE id=R1 action=PERMIT proto=TCP src=10.0.0.50 dst=10.0.0.1 dport=22\n# Données : RULE id=R2 action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\n# Données : RULE id=R3 action=PERMIT proto=TCP src=ANY dst=ANY dport=80\nA_COMPLETER\n\n[Cas 3 — Multiples masquages en cascade]\n# Données : RULE id=A1 action=DENY proto=TCP src=ANY dst=ANY dport=22\n# Données : RULE id=A2 action=PERMIT proto=TCP src=192.168.1.1 dst=ANY dport=22\n# Données : RULE id=A3 action=DENY proto=TCP src=192.168.1.2 dst=ANY dport=22\nA_COMPLETER\n",
    "hints": [
      "Parcourir chaque règle i et vérifier si une règle j antérieure (j < i) englobe tous ses critères.",
      "S’arrêter au premier antécédent j qui englobe la règle i."
    ],
    "examples": [
      {
        "stdin": "RULE id=R1 action=DENY proto=ANY src=ANY dst=ANY dport=ANY\nRULE id=R2 action=PERMIT proto=TCP src=10.0.0.1 dst=10.0.0.2 dport=80",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=SHADOWED by R1",
        "note": "R1 bloque tout le trafic, donc R2 située après ne sera jamais atteinte."
      }
    ],
    "tests": [
      {
        "label": "Détection d’une redondance parfaite entre deux règles",
        "stdin": "cas:1",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=REDUNDANT with R1\nANALYZE rule=R3 status=OK"
      },
      {
        "label": "Règles spécifiques d’abord puis règle générale : politique saine",
        "stdin": "cas:2",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=OK\nANALYZE rule=R3 status=OK"
      },
      {
        "label": "Multiples masquages en cascade",
        "stdin": "cas:3",
        "expected": "ANALYZE rule=A1 status=OK\nANALYZE rule=A2 status=SHADOWED by A1\nANALYZE rule=A3 status=REDUNDANT with A1"
      }
    ],
    "solution": "[Exemple]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=SHADOWED by R1\n\n[Cas 1 — Détection d’une redondance parfaite entre deux règles]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=REDUNDANT with R1\nANALYZE rule=R3 status=OK\n\n[Cas 2 — Règles spécifiques d’abord puis règle générale : politique saine]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=OK\nANALYZE rule=R3 status=OK\n\n[Cas 3 — Multiples masquages en cascade]\nANALYZE rule=A1 status=OK\nANALYZE rule=A2 status=SHADOWED by A1\nANALYZE rule=A3 status=REDUNDANT with A1"
  },
  {
    "id": "fw3-c3-e3",
    "chapter": 3,
    "title": "Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler les translations SNAT pour le trafic sortant et DNAT (Port Forwarding) pour le trafic entrant.",
    "brief": "<p>Le mécanisme NAT (Network Address Translation) permet de masquer le plan d'adressage privé ou d'exposer des services internes.<br><br>\nAnalysez les données fournies pour chaque cas. Configuration SNAT :<br>\n<code>CONFIG_SNAT public_ip=&lt;ip&gt; start_port=&lt;p&gt;</code> (alloue les ports sortants séquentiellement : start_port, start_port+1, ...).<br>\n2. Règles DNAT :<br>\n<code>CONFIG_DNAT ext_ip=&lt;ip&gt; ext_port=&lt;p&gt; int_ip=&lt;ip&gt; int_port=&lt;p&gt;</code>.<br>\n3. Paquets réseau :<br>\n<code>PACKET dir=&lt;OUTBOUND|INBOUND&gt; src=&lt;ip:port&gt; dst=&lt;ip:port&gt;</code>.<br><br>\nRègles de translation :<br>\n- <code>OUTBOUND</code> (LAN vers Internet) : applique le SNAT.<br>\n  L'IP et le port source privés <code>src</code> sont remplacés par <code>public_ip:alloué</code>. La destination <code>dst</code> reste inchangée. L'association inverse est mémorisée dans la table d'état.<br>\n- <code>INBOUND</code> (Internet vers LAN) :<br>\n  a) Si <code>dst</code> correspond à une règle <code>CONFIG_DNAT</code> : la destination <code>dst</code> est réécrite vers <code>int_ip:int_port</code>.<br>\n  b) Sinon si <code>dst</code> correspond au port alloué d'une session SNAT existante : la destination <code>dst</code> est restaurée vers l'IP:port interne de l'hôte LAN.<br>\n  c) Sinon : le paquet n'est pas translaté (<code>DROP_NO_ROUTE</code>).<br><br>\nPour chaque paquet, afficher :<br>\n<code>NAT dir={dir} in={src_in}->{dst_in} out={src_out}->{dst_out}</code><br>\n(ou <code>NAT dir={dir} in={src_in}->{dst_in} out=DROP_NO_ROUTE</code> si rejet)</p>",
    "starter": "# Grille d'analyse (fw3-c3-e3) — Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — DNAT Port Forwarding entrant vers serveur web DMZ]\n# Données : CONFIG_DNAT ext_ip=198.51.100.1 ext_port=80 int_ip=10.0.0.10 int_port=8080\n# Données : PACKET dir=INBOUND src=203.0.113.5:12345 dst=198.51.100.1:80\nA_COMPLETER\n\n[Cas 2 — Aller-retour complet : SNAT sortant puis réponse retour]\n# Données : CONFIG_SNAT public_ip=198.51.100.1 start_port=50000\n# Données : PACKET dir=OUTBOUND src=192.168.1.10:4500 dst=8.8.8.8:53\n# Données : PACKET dir=INBOUND src=8.8.8.8:53 dst=198.51.100.1:50000\nA_COMPLETER\n\n[Cas 3 — Paquet entrant sans DNAT ni session SNAT correspondante]\n# Données : CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\n# Données : PACKET dir=INBOUND src=1.2.3.4:9999 dst=198.51.100.1:22\nA_COMPLETER\n",
    "hints": [
      "Gérer un compteur incrémental pour les ports SNAT dynamiques.",
      "Mémoriser les sessions SNAT : port_alloué -> (src_interne_ip, src_interne_port)."
    ],
    "examples": [
      {
        "stdin": "CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\nPACKET dir=OUTBOUND src=192.168.1.50:52001 dst=93.184.216.34:80",
        "expected": "NAT dir=OUTBOUND in=192.168.1.50:52001->93.184.216.34:80 out=198.51.100.1:40000->93.184.216.34:80",
        "note": "Translation SNAT avec réécriture de la source vers l’IP publique et premier port alloué 40000."
      }
    ],
    "tests": [
      {
        "label": "DNAT Port Forwarding entrant vers serveur web DMZ",
        "stdin": "cas:1",
        "expected": "NAT dir=INBOUND in=203.0.113.5:12345->198.51.100.1:80 out=203.0.113.5:12345->10.0.0.10:8080"
      },
      {
        "label": "Aller-retour complet : SNAT sortant puis réponse retour",
        "stdin": "cas:2",
        "expected": "NAT dir=OUTBOUND in=192.168.1.10:4500->8.8.8.8:53 out=198.51.100.1:50000->8.8.8.8:53\nNAT dir=INBOUND in=8.8.8.8:53->198.51.100.1:50000 out=8.8.8.8:53->192.168.1.10:4500"
      },
      {
        "label": "Paquet entrant sans DNAT ni session SNAT correspondante",
        "stdin": "cas:3",
        "expected": "NAT dir=INBOUND in=1.2.3.4:9999->198.51.100.1:22 out=DROP_NO_ROUTE"
      }
    ],
    "solution": "[Exemple]\nNAT dir=OUTBOUND in=192.168.1.50:52001->93.184.216.34:80 out=198.51.100.1:40000->93.184.216.34:80\n\n[Cas 1 — DNAT Port Forwarding entrant vers serveur web DMZ]\nNAT dir=INBOUND in=203.0.113.5:12345->198.51.100.1:80 out=203.0.113.5:12345->10.0.0.10:8080\n\n[Cas 2 — Aller-retour complet : SNAT sortant puis réponse retour]\nNAT dir=OUTBOUND in=192.168.1.10:4500->8.8.8.8:53 out=198.51.100.1:50000->8.8.8.8:53\nNAT dir=INBOUND in=8.8.8.8:53->198.51.100.1:50000 out=8.8.8.8:53->192.168.1.10:4500\n\n[Cas 3 — Paquet entrant sans DNAT ni session SNAT correspondante]\nNAT dir=INBOUND in=1.2.3.4:9999->198.51.100.1:22 out=DROP_NO_ROUTE"
  }
];
